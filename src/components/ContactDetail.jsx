import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Avatar, { initials, colorFor } from './Avatar';

const fullName = (c) => `${c.first} ${c.last}`;

const ContactDetail = ({ contacts, toggleFavorite, deleteContact }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const c = contacts.find((x) => x.id === parseInt(id));
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  if (!c)
    return (
      <div className="empty-state">
        <i className="bi bi-person-x"></i>
        <h3>Contact not found</h3>
      </div>
    );

  return (
    <div className="detail-page">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
        <button className="icon-btn" onClick={() => navigate(-1)} title="Back">
          <i className="bi bi-arrow-left"></i>
        </button>
        <div style={{ flex: 1 }}></div>
        <Link to={`/edit/${c.id}`} className="icon-btn" title="Edit">
          <i className="bi bi-pencil"></i>
        </Link>
        <button
          className={`icon-btn star-btn ${c.isFavorite ? 'active' : ''}`}
          onClick={() => toggleFavorite(c.id)}
          title={c.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <i className={`bi ${c.isFavorite ? 'bi-star-fill' : 'bi-star'}`}></i>
        </button>
        <div style={{ position: 'relative' }} ref={menuRef}>
          <button className="icon-btn" title="More" onClick={() => setShowMenu(!showMenu)}>
            <i className="bi bi-three-dots-vertical"></i>
          </button>
          {showMenu && (
            <div className="card-menu-dropdown">
              <Link to={`/edit/${c.id}`} className="card-menu-item" onClick={() => setShowMenu(false)}>Edit</Link>
              <button
                className="card-menu-item"
                onClick={() => {
                  deleteContact(c.id);
                  setShowMenu(false);
                  navigate('/');
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="detail-hero">
        <Avatar contact={c} size={96} fontSize={40} />
        <div className="name-area">
          <h2>{fullName(c)}</h2>
          {c.company && <p>{c.company}</p>}
          <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <span className="chip">
              <i className="bi bi-person"></i> {c.label}
            </span>
          </div>
        </div>
      </div>

      <div className="detail-actions">
        <button className="detail-action-btn">
          <i className="bi bi-telephone"></i> Call
        </button>
        <button className="detail-action-btn">
          <i className="bi bi-envelope"></i> Email
        </button>
        <button className="detail-action-btn">
          <i className="bi bi-chat"></i> Message
        </button>
        <button className="detail-action-btn">
          <i className="bi bi-video"></i> Video
        </button>
        <button className="detail-action-btn">
          <i className="bi bi-three-dots"></i> More
        </button>
      </div>

      <hr style={{ borderColor: 'var(--outline)', margin: '24px 0' }} />

      <div className="detail-section">
        <div className="detail-section-title">Contact info</div>
        <div className="detail-field">
          <i className="bi bi-telephone"></i>
          <div className="detail-field-body">
            <div className="detail-field-value">{c.phone}</div>
            <div className="detail-field-label">{c.label}</div>
          </div>
        </div>
        <div className="detail-field">
          <i className="bi bi-envelope"></i>
          <div className="detail-field-body">
            <div className="detail-field-value">{c.email}</div>
            <div className="detail-field-label">Personal</div>
          </div>
        </div>
        {c.company && (
          <div className="detail-field">
            <i className="bi bi-building"></i>
            <div className="detail-field-body">
              <div className="detail-field-value">{c.company}</div>
              <div className="detail-field-label">Company</div>
            </div>
          </div>
        )}
        {c.bloodGroup && (
          <div className="detail-field">
            <i className="bi bi-droplet-fill" style={{ color: '#d93025' }}></i>
            <div className="detail-field-body">
              <div className="detail-field-value" style={{ fontWeight: 500 }}>{c.bloodGroup}</div>
              <div className="detail-field-label">Blood Group</div>
            </div>
          </div>
        )}
      </div>

      <div className="detail-section">
        <div className="detail-section-title">Other</div>
        <div className="detail-field">
          <i className="bi bi-calendar3"></i>
          <div className="detail-field-body">
            <div className="detail-field-value">{c.birthday || <span style={{ color: 'var(--on-surface-variant)', fontStyle: 'italic' }}>Not added</span>}</div>
            <div className="detail-field-label">Birthday</div>
          </div>
        </div>
        <div className="detail-field">
          <i className="bi bi-geo-alt"></i>
          <div className="detail-field-body">
            <div className="detail-field-value">{c.address || <span style={{ color: 'var(--on-surface-variant)', fontStyle: 'italic' }}>Not added</span>}</div>
            <div className="detail-field-label">Address</div>
          </div>
        </div>
        {c.notes && (
          <div className="detail-field">
            <i className="bi bi-sticky"></i>
            <div className="detail-field-body">
              <div className="detail-field-value">{c.notes}</div>
              <div className="detail-field-label">Notes</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactDetail;
