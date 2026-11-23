import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import PageHeader from '../components/PageHeader';
import Icon from '../components/Icon';
import { validateShipment } from '../utils/validation';

const initialForm = { sender: '', recipient: '', recipientPhone: '', origin: '', destination: '', cargo: '', weight: '', expectedDelivery: '', priority: 'Standard' };
const steps = [
  { title: 'Shipment details', description: 'Cargo and sender', fields: ['sender', 'cargo', 'weight'] },
  { title: 'Delivery route', description: 'Origin and destination', fields: ['origin', 'destination', 'expectedDelivery'] },
  { title: 'Recipient', description: 'Who receives it?', fields: ['recipient', 'recipientPhone'] },
];

function Field({ label, name, value, onChange, error, placeholder, type = 'text', required = false, hint }) {
  return <div className="form-field"><label htmlFor={name}>{label}{required && <span aria-hidden="true"> *</span>}</label><input id={name} name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : hint ? `${name}-hint` : undefined} />{error && <small className="field-error" id={`${name}-error`}>{error}</small>}{hint && !error && <small className="field-hint" id={`${name}-hint`}>{hint}</small>}</div>;
}

export default function NewShipment() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const { createShipment } = useApp();
  const navigate = useNavigate();
  const onChange = (event) => { const { name, value } = event.target; setForm((current) => ({ ...current, [name]: value })); setErrors((current) => ({ ...current, [name]: undefined })); };

  const validateCurrentStep = () => {
    const allErrors = validateShipment(form);
    const currentErrors = Object.fromEntries(steps[step - 1].fields.filter((field) => allErrors[field]).map((field) => [field, allErrors[field]]));
    setErrors((current) => ({ ...current, ...currentErrors }));
    return Object.keys(currentErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) setStep((current) => Math.min(3, current + 1));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateShipment(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const firstInvalidStep = steps.findIndex((item) => item.fields.some((field) => nextErrors[field]));
      setStep(firstInvalidStep < 0 ? 1 : firstInvalidStep + 1);
      return;
    }
    setSubmitting(true);
    try {
      const shipment = await createShipment(form);
      navigate(`/shipments/${shipment.id}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="back-row"><Link to="/shipments" className="back-link"><Icon name="arrow" size={15} /> Back to shipments</Link></div>
      <PageHeader eyebrow="SHIPMENT MANAGEMENT" title="Create a shipment" description="Add sender, recipient and delivery details to start a new shipment record." />
      <form className="panel shipment-form" onSubmit={handleSubmit} noValidate>
        <ol className="form-stepper" aria-label="Shipment form progress">{steps.map((item, index) => <li className={`form-stepper__item ${step === index + 1 ? 'is-current' : ''} ${step > index + 1 ? 'is-complete' : ''}`} key={item.title} aria-current={step === index + 1 ? 'step' : undefined}><span>{step > index + 1 ? <Icon name="check" size={14} /> : `0${index + 1}`}</span><div><strong>{item.title}</strong><small>{item.description}</small></div></li>)}</ol>
        {step === 1 && <div className="form-section"><div className="form-section__heading"><span>01</span><div><h2>Shipment details</h2><p>Tell us what is being moved and who is sending it.</p></div></div><div className="form-grid"><Field label="Sender / company" name="sender" value={form.sender} onChange={onChange} error={errors.sender} placeholder="e.g. Northstar Foods" required /><Field label="Cargo description" name="cargo" value={form.cargo} onChange={onChange} error={errors.cargo} placeholder="e.g. Refrigerated cartons" required /><Field label="Shipment weight" name="weight" value={form.weight} onChange={onChange} error={errors.weight} placeholder="e.g. 250 kg" required hint="Enter a number and unit, such as 250 kg." /><div className="form-field"><label htmlFor="priority">Priority</label><select id="priority" name="priority" value={form.priority} onChange={onChange}><option>Standard</option><option>Express</option></select></div></div></div>}
        {step === 2 && <div className="form-section"><div className="form-section__heading"><span>02</span><div><h2>Delivery route</h2><p>Set the pickup and destination locations.</p></div></div><div className="form-grid"><Field label="Origin" name="origin" value={form.origin} onChange={onChange} error={errors.origin} placeholder="City, State" required /><Field label="Destination" name="destination" value={form.destination} onChange={onChange} error={errors.destination} placeholder="City, State" required /><Field label="Expected delivery" name="expectedDelivery" value={form.expectedDelivery} onChange={onChange} error={errors.expectedDelivery} type="date" required /></div></div>}
        {step === 3 && <div className="form-section"><div className="form-section__heading"><span>03</span><div><h2>Recipient information</h2><p>Who should receive this delivery?</p></div></div><div className="form-grid"><Field label="Recipient full name" name="recipient" value={form.recipient} onChange={onChange} error={errors.recipient} placeholder="Full name" required /><Field label="Recipient phone" name="recipientPhone" value={form.recipientPhone} onChange={onChange} error={errors.recipientPhone} placeholder="+91 98765 43210" required /></div><div className="review-note"><Icon name="clipboard" size={17} /><p>Review the shipment details and route before creating the record. You can use Previous to make changes.</p></div></div>}
        <div className="form-actions"><p><span aria-hidden="true">*</span> Required fields. Your shipment is saved to the demo API or this device when offline.</p><div>{step > 1 && <button type="button" className="button button--secondary" onClick={() => setStep((current) => Math.max(1, current - 1))}>Previous</button>}{step < 3 ? <button type="button" className="button button--primary" onClick={handleNext}>Continue <Icon name="arrow" size={16} /></button> : <button type="submit" className="button button--primary" disabled={submitting}>{submitting ? 'Creating…' : 'Create shipment'} <Icon name="check" size={16} /></button>}</div></div>
      </form>
    </>
  );
}
