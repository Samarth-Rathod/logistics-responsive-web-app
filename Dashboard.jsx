import { Link } from 'react-router';
import { useApp } from '../context/AppContext';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import ShipmentTable from '../components/ShipmentTable';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import Icon from '../components/Icon';
import { formatCompactDate } from '../utils/formatters';

export default function Dashboard() {
  const { shipments, loading, profile } = useApp();
  if (loading) return <LoadingState label="Preparing your logistics overview…" />;

  const total = shipments.length;
  const delivered = shipments.filter((item) => item.status === 'Delivered').length;
  const inTransit = shipments.filter((item) => item.status === 'In Transit').length;
  const attention = shipments.filter((item) => item.status === 'Delayed' || item.status === 'Pending').length;
  const deliveredPercent = total ? Math.round((delivered / total) * 100) : 0;
  const recent = [...shipments].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

  return (
    <>
      <PageHeader eyebrow="MONDAY, 23 NOVEMBER 2026" title={`Good evening, ${profile.name?.split(' ')[0] || 'there'}`} description="Here's what's happening across your delivery network today." actions={<Link className="button button--primary" to="/new-shipment"><Icon name="plus" size={17} /> Create shipment</Link>} />
      <section className="stat-grid" aria-label="Shipment summary">
        <StatCard label="Total shipments" value={total} note="Across all routes" icon="package" tone="blue" />
        <StatCard label="In transit" value={inTransit} note="Currently on the move" icon="truck" tone="purple" />
        <StatCard label="Delivered" value={delivered} note={`${deliveredPercent}% of all shipments`} icon="check" tone="green" trend="up" />
        <StatCard label="Need attention" value={attention} note="Pending or delayed" icon="alert" tone="amber" />
      </section>
      <section className="dashboard-grid">
        <article className="panel performance-panel">
          <div className="panel__heading"><div><p className="eyebrow">DELIVERY PERFORMANCE</p><h2>Weekly movement</h2></div><span className="panel__period"><Icon name="calendar" size={14} /> Last 7 days</span></div>
          <div className="performance-summary"><strong>{deliveredPercent}%</strong><span>delivery completion rate</span><span className="performance-summary__pill">{delivered} completed</span></div>
          <div className="bar-chart" role="img" aria-label="Illustrative weekly delivery activity chart from Monday to Sunday">
            {[{ day: 'Mon', value: 42 }, { day: 'Tue', value: 68 }, { day: 'Wed', value: 52 }, { day: 'Thu', value: 86 }, { day: 'Fri', value: 74 }, { day: 'Sat', value: 58 }, { day: 'Sun', value: 35 }].map((item) => <div className="bar-chart__item" key={item.day}><div className="bar-chart__track"><span style={{ height: `${item.value}%` }} /></div><small>{item.day}</small></div>)}
          </div>
          <p className="chart-footnote">Illustrative activity based on the demo dataset. Connect a production API for live operational analytics.</p>
        </article>
        <article className="panel route-panel">
          <div className="panel__heading"><div><p className="eyebrow">NETWORK SNAPSHOT</p><h2>Active routes</h2></div><Link className="text-link" to="/shipments">View all <Icon name="arrow" size={14} /></Link></div>
          <div className="route-highlight"><div className="route-highlight__visual"><span className="route-node route-node--start" /><span className="route-dash" /><span className="route-node route-node--end" /></div><div className="route-highlight__cities"><strong>Mumbai</strong><span>→</span><strong>Pune</strong></div><p>Most active corridor this week</p></div>
          <div className="route-list"><div><span className="route-list__dot route-list__dot--purple" /><span>West zone</span><strong>{shipments.filter((item) => /Mumbai|Pune|Thane|Navi Mumbai/.test(item.origin)).length} shipments</strong></div><div><span className="route-list__dot route-list__dot--blue" /><span>South zone</span><strong>{shipments.filter((item) => /Bengaluru|Hyderabad/.test(item.destination)).length} shipments</strong></div><div><span className="route-list__dot route-list__dot--orange" /><span>Other routes</span><strong>{Math.max(0, total - shipments.filter((item) => /Mumbai|Pune|Thane|Navi Mumbai/.test(item.origin) || /Bengaluru|Hyderabad/.test(item.destination)).length)} shipments</strong></div></div>
        </article>
      </section>
      <section className="panel table-panel">
        <div className="panel__heading"><div><p className="eyebrow">LATEST UPDATES</p><h2>Recent shipments</h2></div><Link className="button button--secondary button--small" to="/shipments">All shipments <Icon name="arrow" size={15} /></Link></div>
        {recent.length ? <ShipmentTable shipments={recent} compact /> : <EmptyState title="No shipments yet" description="Create your first shipment to start tracking deliveries." action={<Link className="button button--primary" to="/new-shipment">Create shipment</Link>} />}
      </section>
    </>
  );
}
