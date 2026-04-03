import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { colorFor } from './Avatar';
import GInput from './GInput';

// All optional fields user can add
const OPTIONAL_FIELDS = [
  { key: 'bloodGroup', label: 'Blood Group', icon: 'bi-droplet-fill', iconColor: '#d93025', type: 'select' },
  { key: 'birthday',   label: 'Birthday',    icon: 'bi-calendar3',    iconColor: 'var(--on-surface-variant)', type: 'date' },
  { key: 'address',    label: 'Address',     icon: 'bi-geo-alt',      iconColor: 'var(--on-surface-variant)', type: 'text' },
  { key: 'notes',      label: 'Notes',       icon: 'bi-sticky',       iconColor: 'var(--on-surface-variant)', type: 'text' },
];

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const ContactForm = ({ contacts, setContacts, edit }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const existing = edit ? contacts.find((c) => c.id === parseInt(id)) : null;

  const [form, setForm] = useState(
    existing || {
      first: '', last: '', email: '', phone: '',
      company: '', label: 'Mobile',
    }
  );

  // Track which optional fields are currently "added" by user
  const [addedFields, setAddedFields] = useState(() => {
    if (existing) {
      return OPTIONAL_FIELDS
        .filter(f => existing[f.key] !== undefined && existing[f.key] !== '')
        .map(f => f.key);
    }
    return [];
  });

  const [showFieldMenu, setShowFieldMenu] = useState(false);

  const handle = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const addField = (key) => {
    if (!addedFields.includes(key)) {
      setAddedFields(prev => [...prev, key]);
      setForm(f => ({ ...f, [key]: '' }));
    }
    setShowFieldMenu(false);
  };

  const removeField = (key) => {
    setAddedFields(prev => prev.filter(k => k !== key));
    setForm(f => {
      const updated = { ...f };
      delete updated[key];
      return updated;
    });
  };

  const save = () => {
    if (!form.first.trim()) return alert('First name is required');
    if (edit) {
      setContacts((cs) =>
        cs.map((c) => (c.id === parseInt(id) ? { ...form, id: parseInt(id) } : c))
      );
      navigate(`/contact/${id}`);
    } else {
      const newC = { ...form, id: Date.now() };
      setContacts((cs) => [...cs, newC]);
      navigate('/');
    }
  };

  // Fields not yet added (to show in the menu)
  const availableFields = OPTIONAL_FIELDS.filter(f => !addedFields.includes(f.key));

  return (
    <div className="form-page">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
        <button className="icon-btn" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left"></i>
        </button>
        <h2 style={{ fontFamily: "'Google Sans',sans-serif", fontSize: 24, fontWeight: 400, margin: 0 }}>
          {edit ? 'Edit contact' : 'Create contact'}
        </h2>
      </div>

      {/* Avatar */}
      <div className="form-avatar-wrap">
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: form.first ? colorFor(form.first) : '#9aa0a6',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 32, color: 'white', fontFamily: "'Google Sans',sans-serif",
        }}>
          {form.first ? (
            (form.first[0] + (form.last[0] || '')).toUpperCase()
          ) : (
            <i className="bi bi-person" style={{ fontSize: 36 }}></i>
          )}
        </div>
        <button className="btn-cancel" style={{ fontSize: 13 }}>
          <i className="bi bi-camera me-1"></i>Add photo
        </button>
      </div>

      {/* Name */}
      <div className="field-row">
        <i className="bi bi-person" style={{ fontSize: 20, color: 'var(--on-surface-variant)', marginTop: 22 }}></i>
        <div className="field-group">
          <GInput label="First name" name="first" val={form.first} onChange={handle} />
          <GInput label="Last name"  name="last"  val={form.last}  onChange={handle} />
        </div>
      </div>

      {/* Company */}
      <div className="field-row">
        <i className="bi bi-briefcase" style={{ fontSize: 20, color: 'var(--on-surface-variant)', marginTop: 22 }}></i>
        <div className="field-group">
          <GInput label="Company" name="company" val={form.company} onChange={handle} />
        </div>
      </div>

      <hr className="form-divider" />

      {/* Phone */}
      <div className="field-row">
        <i className="bi bi-telephone" style={{ fontSize: 20, color: 'var(--on-surface-variant)', marginTop: 22 }}></i>
        <div className="field-group">
          <GInput label="Phone" name="phone" val={form.phone} onChange={handle} type="tel" />
          <div className="google-input-wrap" style={{ maxWidth: 130 }}>
            <select className="google-input" name="label" value={form.label} onChange={handle}
              style={{ paddingTop: 20, appearance: 'none' }}>
              <option>Mobile</option>
              <option>Home</option>
              <option>Work</option>
              <option>Other</option>
            </select>
            <label className="google-label" style={{ top: 4, fontSize: 11 }}>Label</label>
          </div>
        </div>
      </div>

      {/* Email */}
      <div className="field-row">
        <i className="bi bi-envelope" style={{ fontSize: 20, color: 'var(--on-surface-variant)', marginTop: 22 }}></i>
        <div className="field-group">
          <GInput label="Email" name="email" val={form.email} onChange={handle} type="email" />
        </div>
      </div>

      {/* ── Dynamically added optional fields ── */}
      {addedFields.map(key => {
        const field = OPTIONAL_FIELDS.find(f => f.key === key);
        if (!field) return null;
        return (
          <div className="field-row" key={key} style={{ alignItems: 'flex-start' }}>
            <i className={`bi ${field.icon}`}
              style={{ fontSize: 20, color: field.iconColor, marginTop: 22 }}></i>
            <div className="field-group" style={{ flex: 1 }}>
              {field.type === 'select' ? (
                <div className="google-input-wrap" style={{ flex: 1, maxWidth: 200 }}>
                  <select className="google-input" name={field.key}
                    value={form[field.key] || ''} onChange={handle}
                    style={{ paddingTop: 20, appearance: 'none', background: 'transparent' }}>
                    <option value="" disabled hidden></option>
                    {BLOOD_GROUPS.map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                  <label className="google-label" style={{ top: 4, fontSize: 11 }}>
                    {field.label}
                  </label>
                </div>
              ) : (
                <GInput label={field.label} name={field.key}
                  val={form[field.key] || ''} onChange={handle}
                  type={field.type === 'date' ? 'date' : 'text'} />
              )}
            </div>
            {/* Remove field button */}
            <button
              onClick={() => removeField(key)}
              title={`Remove ${field.label}`}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--on-surface-variant)', fontSize: 18,
                marginTop: 20, padding: '0 4px', flexShrink: 0,
              }}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        );
      })}

      {/* ── Add field button ── */}
      {availableFields.length > 0 && (
        <div style={{ position: 'relative', marginLeft: 32, marginTop: 8 }}>
          <button
            className="btn-cancel"
            style={{ fontSize: 13 }}
            onClick={() => setShowFieldMenu(v => !v)}
          >
            <i className="bi bi-plus me-1"></i>Add field
          </button>
          {showFieldMenu && (
            <div style={{
              position: 'absolute', top: '100%', left: 0,
              background: 'var(--surface)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
              borderRadius: 8, zIndex: 200,
              minWidth: 180, padding: '8px 0',
            }}>
              {availableFields.map(f => (
                <button
                  key={f.key}
                  onClick={() => addField(f.key)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    width: '100%', padding: '10px 16px',
                    background: 'none', border: 'none',
                    cursor: 'pointer', fontSize: 14,
                    color: 'var(--on-surface)',
                    textAlign: 'left',
                  }}
                  onMouseOver={e => e.currentTarget.style.background = 'var(--surface-variant)'}
                  onMouseOut={e => e.currentTarget.style.background = 'none'}
                >
                  <i className={`bi ${f.icon}`} style={{ color: f.iconColor, fontSize: 16 }}></i>
                  {f.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="form-actions">
        <button className="btn-cancel" onClick={() => navigate(-1)}>Cancel</button>
        <button className="btn-save" onClick={save}>Save</button>
      </div>
    </div>
  );
};

export default ContactForm;
