import Icon from './Icon';

export default function EmptyState({ title = 'Nothing to show yet', description = 'Try changing your filters or add a new shipment.', action }) {
  return <div className="empty-state"><span className="empty-state__icon"><Icon name="package" size={26} /></span><h3>{title}</h3><p>{description}</p>{action}</div>;
}
