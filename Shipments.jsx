import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { useApp } from '../context/AppContext';
import PageHeader from '../components/PageHeader';
import ShipmentTable from '../components/ShipmentTable';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import Icon from '../components/Icon';

const PAGE_SIZE = 6;

export default function Shipments() {
  const { shipments, loading } = useApp();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All statuses');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return [...shipments].filter((item) => {
      const matchesSearch = !search || [item.id, item.reference, item.sender, item.recipient, item.origin, item.destination].some((value) => String(value || '').toLowerCase().includes(search));
      const matchesStatus = status === 'All statuses' || item.status === status;
      return matchesSearch && matchesStatus;
    }).sort((a, b) => sort === 'oldest' ? new Date(a.createdAt) - new Date(b.createdAt) : sort === 'delivery' ? String(a.expectedDelivery).localeCompare(String(b.expectedDelivery)) : new Date(b.createdAt) - new Date(a.createdAt));
  }, [shipments, query, status, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const updateQuery = (value) => { setQuery(value); setPage(1); };
  const updateStatus = (value) => { setStatus(value); setPage(1); };

  if (loading) return <LoadingState label="Loading shipment records…" />;
  return (
    <>
      <PageHeader eyebrow="SHIPMENT MANAGEMENT" title="All shipments" description="Search, monitor and manage every delivery moving through your network." actions={<Link className="button button--primary" to="/new-shipment"><Icon name="plus" size={17} /> New shipment</Link>} />
      <section className="panel list-panel">
        <div className="list-toolbar"><div className="search-field"><Icon name="search" size={18} /><label className="sr-only" htmlFor="shipment-search">Search shipments</label><input id="shipment-search" type="search" value={query} onChange={(event) => updateQuery(event.target.value)} placeholder="Search ID, sender, recipient or route" /></div><div className="list-toolbar__filters"><div className="select-field"><Icon name="filter" size={16} /><label className="sr-only" htmlFor="status-filter">Filter by status</label><select id="status-filter" value={status} onChange={(event) => updateStatus(event.target.value)}><option>All statuses</option><option>Pending</option><option>In Transit</option><option>Delayed</option><option>Delivered</option></select></div><div className="select-field"><label className="sr-only" htmlFor="sort-shipments">Sort shipments</label><select id="sort-shipments" value={sort} onChange={(event) => setSort(event.target.value)}><option value="newest">Newest first</option><option value="oldest">Oldest first</option><option value="delivery">Delivery date</option></select><Icon name="chevron" size={15} /></div></div></div>
        <div className="table-meta"><span><strong>{filtered.length}</strong> shipment{filtered.length === 1 ? '' : 's'} found</span><span>Page {page} of {pageCount}</span></div>
        {visible.length ? <ShipmentTable shipments={visible} /> : <EmptyState title="No matching shipments" description="Try a different search term or clear the status filter." action={<button type="button" className="button button--secondary" onClick={() => { setQuery(''); setStatus('All statuses'); setPage(1); }}>Clear filters</button>} />}
        {filtered.length > PAGE_SIZE && <div className="pagination"><span>Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}</span><div><button type="button" className="pagination__button" disabled={page === 1} onClick={() => setPage((current) => Math.max(1, current - 1))}>Previous</button><button type="button" className="pagination__button" disabled={page === pageCount} onClick={() => setPage((current) => Math.min(pageCount, current + 1))}>Next</button></div></div>}
      </section>
      <p className="page-note"><Icon name="alert" size={15} /> Shipment records are sample data for this internship project. Connect your own authorised logistics API before using real customer information.</p>
    </>
  );
}
