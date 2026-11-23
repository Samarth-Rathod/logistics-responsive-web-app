import { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import PageHeader from '../components/PageHeader';
import Icon from '../components/Icon';
import { getInitials } from '../utils/formatters';
import { validateProfile } from '../utils/validation';

export default function Profile() {
  const { profile, updateProfile } = useApp();
  const [form, setForm] = useState(profile);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  useEffect(() => setForm(profile), [profile]);
  const handleChange = (event) => { const { name, value } = event.target; setForm((current) => ({ ...current, [name]: value })); setErrors((current) => ({ ...current, [name]: undefined })); };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateProfile(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setSaving(true);
    try { await updateProfile({ name: form.name, email: form.email, phone: form.phone, department: form.department, location: form.location, avatarInitials: getInitials(form.name) }); }
    finally { setSaving(false); }
  };

  return (
    <>
      <PageHeader eyebrow="ACCOUNT SETTINGS" title="My profile" description="Manage the contact information associated with your operations workspace." />
      <div className="profile-layout">
        <aside className="panel profile-summary"><div className="profile-summary__cover" /><span className="avatar avatar--large">{profile.avatarInitials || getInitials(profile.name)}</span><h2>{profile.name}</h2><p>{profile.role}</p><span className="profile-summary__tag"><span /> Active account</span><div className="profile-summary__meta"><div><Icon name="users" size={15} /><span>{profile.department}</span></div><div><Icon name="pin" size={15} /><span>{profile.location}</span></div></div></aside>
        <form className="panel profile-form" onSubmit={handleSubmit} noValidate><div className="panel__heading"><div><p className="eyebrow">PERSONAL INFORMATION</p><h2>Profile details</h2></div><span className="muted-label">All fields marked * are required</span></div><div className="form-grid"><div className="form-field"><label htmlFor="name">Full name <span>*</span></label><input id="name" name="name" value={form.name || ''} onChange={handleChange} aria-invalid={Boolean(errors.name)} />{errors.name && <small className="field-error">{errors.name}</small>}</div><div className="form-field"><label htmlFor="email">Email address <span>*</span></label><input id="email" name="email" type="email" value={form.email || ''} onChange={handleChange} aria-invalid={Boolean(errors.email)} />{errors.email && <small className="field-error">{errors.email}</small>}</div><div className="form-field"><label htmlFor="phone">Phone number</label><input id="phone" name="phone" value={form.phone || ''} onChange={handleChange} aria-invalid={Boolean(errors.phone)} />{errors.phone && <small className="field-error">{errors.phone}</small>}</div><div className="form-field"><label htmlFor="department">Department</label><input id="department" name="department" value={form.department || ''} onChange={handleChange} /></div><div className="form-field form-field--full"><label htmlFor="location">Work location</label><input id="location" name="location" value={form.location || ''} onChange={handleChange} /></div></div><div className="form-actions"><p>Profile changes are stored in your demo API or locally when offline.</p><button className="button button--primary" type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save changes'} <Icon name="check" size={16} /></button></div></form>
      </div>
    </>
  );
}
