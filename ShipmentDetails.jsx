import { Link, useNavigate, useParams } from 'react-router';
import { useApp } from '../context/AppContext';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import Icon from '../components/Icon';
import { formatDate } from '../utils/formatters';

export default function ShipmentDetails() {
  const { shipmentId } = useParams();
  const navigate = useNavigate();
  const { shipments, loading } = useApp();
  if (loading) return <LoadingState label="Opening shipment details…" />;
  const shipment = shipments.find((item) => String(item.id) === String(shipmentId));
  if (!shipment) return <EmptyState title="Shipment not found" description="This shipment may have been removed or the link may be incorrect." action={<Link to="/shipments" className="button button--primary">Back to shipments</Link>} />;

  return (
    <>
      <div className="back-row"><button type="button" className="back-link" onClick={() => navigate(-1)}><Icon name="arrow" size={15} /> Back</button><span>/</span><Link to="/shipments">Shipments</Link><span>/</span><strong>{shipment.id}</strong></div>
      <PageHeader eyebrow="SHIPMENT OVERVIEW" title={shipment.id} description={`${shipment.sender} · Reference ${shipment.reference}`} actions={<StatusBadge status={shipment.status} />} />
      <section className="detail-grid">
        <div className="detail-main">
          <article className="panel route-detail-panel"><div className="panel__heading"><div><p className="eyebrow">DELIVERY ROUTE</p><h2>Journey overview</h2></div><span className="priority-chip">{shipment.priority} priority</span></div><div className="journey"><div className="journey__point"><span className="journey__marker journey__marker--start"><Icon name="pin" size={16} /></span><div><small>ORIGIN</small><strong>{shipment.origin}</strong><span>Pickup location</span></div></div><div className="journey__connector"><span>{shipment.progress}% complete</span><div className="progress-track"><span style={{ width: `${shipment.progress}%` }} /></div></div><div className="journey__point"><span className="journey__marker journey__marker--end"><Icon name="pin" size={16} /></span><div><small>DESTINATION</small><strong>{shipment.destination}</strong><span>Delivery location</span></div></div></div><div className="route-facts"><div><span>Cargo</span><strong>{shipment.cargo}</strong></div><div><span>Weight</span><strong>{shipment.weight}</strong></div><div><span>Expected delivery</span><strong>{formatDate(shipment.expectedDelivery)}</strong></div></div></article>
          <article className="panel timeline-panel"><div className="panel__heading"><div><p className="eyebrow">TRACKING ACTIVITY</p><h2>Shipment timeline</h2></div><span className="muted-label">5 milestones</span></div><ol className="timeline">{(shipment.timeline || []).map((event, index) => <li className={`timeline__item ${event.complete ? 'timeline__item--complete' : ''}`} key={`${event.title}-${index}`}><span className="timeline__marker">{event.complete ? <Icon name="check" size={13} /> : <span />}</span><div className="timeline__content"><div><strong>{event.title}</strong><time>{event.date}</time></div><p>{event.detail}</p></div></li>)}</ol></article>
        </div>
        <aside className="detail-aside">
          <article className="panel info-panel"><div className="panel__heading"><h2>Delivery contact</h2><Icon name="users" size={17} /></div><div className="contact-card"><span className="avatar">{shipment.recipient?.split(' ').map((part) => part[0]).slice(0, 2).join('')}</span><div><strong>{shipment.recipient}</strong><span>Recipient</span></div></div><div className="info-row"><span>Phone number</span><a href={`tel:${shipment.recipientPhone}`}>{shipment.recipientPhone}</a></div><div className="info-row"><span>Assigned partner</span><strong>{shipment.assignedTo}</strong></div></article>
          <article className="panel info-panel"><div className="panel__heading"><h2>Proof of delivery</h2><Icon name="clipboard" size={17} /></div>{shipment.status === 'Delivered' ? <div className="pod-success"><span><Icon name="check" size={18} /></span><strong>Delivery confirmed</strong><p>Received by {shipment.podName || shipment.recipient}.</p><small>{shipment.podNote || 'Delivery confirmation recorded.'}</small></div> : <div className="pod-pending"><span><Icon name="clock" size={18} /></span><strong>Awaiting confirmation</strong><p>Proof of delivery will appear here after the shipment is marked delivered.</p></div>}</article>
          <article className="panel reference-panel"><span>CREATED</span><strong>{formatDate(shipment.createdAt?.slice(0, 10))}</strong><span>SHIPMENT REFERENCE</span><strong>{shipment.reference}</strong></article>
        </aside>
      </section>
    </>
  );
}
