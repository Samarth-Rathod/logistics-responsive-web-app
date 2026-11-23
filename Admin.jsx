import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import ShipmentTable from '../components/ShipmentTable';
import StatusBadge from '../components/StatusBadge';
import LoadingState from '../components/LoadingState';
import Icon from '../components/Icon';

function exportShipments(shipments) {
  const columns = ['id', 'reference', 'sender', 'recipient', 'origin', 'destination', 'status', 'expectedDelivery'];
  const csv = [columns.join(','), ...shipments.map((item) => columns.map((key) => `"${String(item[key] ?? '').replaceAll('"', '""')}"`).join(','))].join('\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'wayline-shipments.csv';
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function Admin() {
  const { shipments, users, loading, updateShipment } = useApp();
  const delayed = shipments.filter((item) => item.status === 'Delayed').length;
  const activeUsers = users.filter((item) => item.status === 'Active').length;
  const delivered = shipments.filter((item) => item.status === 'Delivered').length;
  const sorted = useMemo(() => [...shipments].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)), [shipments]);
  if (loading) return <LoadingState label="Loading administration panel…" />;
  const handleStatusChange = async (id, status) => {
    const progress = status === 'Delivered' ? 100 : status === 'In Transit' ? 55 : status === 'Delayed' ? 42 : 8;
    const changes = { status, progress };
    if (status === 'Delivered') {
      changes.podName = shipments.find((item) => item.id === id)?.recipient || '';
      changes.podNote = 'Delivery marked complete by operations administrator.';
      changes.timeline = (shipments.find((item) => item.id === id)?.timeline || []).map((event) => ({ ...event, complete: true }));
    }
    await updateShipment(id, changes);
  };

  return (
    <>
      <PageHeader eyebrow="OPERATIONS CONTROL" title="Admin panel" description="Monitor workspace activity and manage shipment statuses." actions={<button type="button" className="button button--secondary" onClick={() => exportShipments(shipments)}><Icon name="download" size={16} /> Export CSV</button>} />
      <section className="stat-grid stat-grid--admin"><StatCard label="Total shipments" value={shipments.length} note="All recorded shipments" icon="package" tone="blue" /><StatCard label="Delivered" value={delivered} note="Completed deliveries" icon="check" tone="green" /><StatCard label="Delayed" value={delayed} note="Require follow-up" icon="alert" tone="amber" /><StatCard label="Active users" value={activeUsers} note={`${users.length} accounts in workspace`} icon="users" tone="purple" /></section>
      <section className="panel admin-shipments"><div className="panel__heading"><div><p className="eyebrow">LIVE OPERATIONS</p><h2>Shipment controls</h2><p className="panel__subtext">Update a status to simulate the operations team's workflow.</p></div><span className="admin-live"><span /> Demo controls</span></div><ShipmentTable shipments={sorted} admin onStatusChange={handleStatusChange} /></section>
      <section className="panel users-panel"><div className="panel__heading"><div><p className="eyebrow">ACCESS MANAGEMENT</p><h2>Workspace users</h2></div><span className="muted-label">{users.length} accounts</span></div><div className="users-list"><div className="users-list__head"><span>USER</span><span>ROLE</span><span>STATUS</span><span>LAST ACTIVE</span></div>{users.map((user) => <div className="users-list__row" key={user.id}><div className="users-list__person"><span className="avatar avatar--small">{user.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</span><span><strong>{user.name}</strong><small>{user.email}</small></span></div><span>{user.role}</span><span><StatusBadge status={user.status} /></span><span className="muted-label">{user.lastActive}</span></div>)}</div></section>
      <p className="page-note"><Icon name="alert" size={15} /> This is a demonstration admin interface. Production access controls, audit logs and server-side permissions must be added before real deployment.</p>
    </>
  );
}
