import { Link } from 'react-router';
import StatusBadge from './StatusBadge';
import Icon from './Icon';
import { formatDate } from '../utils/formatters';

export default function ShipmentTable({ shipments, compact = false, admin = false, onStatusChange }) {
  if (!shipments.length) return null;
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead><tr>
          <th scope="col">Shipment</th><th scope="col">Recipient</th><th scope="col">Route</th><th scope="col">Expected</th><th scope="col">Status</th>{admin && <th scope="col">Update status</th>}<th scope="col"><span className="sr-only">Open details</span></th>
        </tr></thead>
        <tbody>{shipments.map((shipment) => (
          <tr key={shipment.id}>
            <td><div className="shipment-id-cell"><span className="shipment-mini-icon"><Icon name="package" size={16} /></span><span><strong>{shipment.id}</strong><small>{shipment.sender}</small></span></div></td>
            <td><strong className="table-primary">{shipment.recipient}</strong><small className="table-secondary">{shipment.recipientPhone}</small></td>
            <td><div className="route-cell"><span>{shipment.origin}</span><span className="route-cell__line" aria-hidden="true">→</span><span>{shipment.destination}</span></div></td>
            <td>{formatDate(shipment.expectedDelivery)}</td>
            <td><StatusBadge status={shipment.status} /></td>
            {admin && <td><label className="sr-only" htmlFor={`status-${shipment.id}`}>Change status for {shipment.id}</label><select id={`status-${shipment.id}`} className="table-select" value={shipment.status} onChange={(event) => onStatusChange?.(shipment.id, event.target.value)}><option>Pending</option><option>In Transit</option><option>Delayed</option><option>Delivered</option></select></td>}
            <td><Link className="icon-link" to={`/shipments/${shipment.id}`} aria-label={`View ${shipment.id}`}><Icon name="arrow" size={16} /></Link></td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}
