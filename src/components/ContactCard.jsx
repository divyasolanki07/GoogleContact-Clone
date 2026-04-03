import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';

const fullName = (c) => `${c.first} ${c.last}`;

const ContactCard = ({ contact, toggleFavorite, deleteContact }) => {
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

  return (
    <div className="contact-row-wrapper" onMouseLeave={() => setShowMenu(false)}>
      <button
        className={`star-btn ${contact.isFavorite ? 'active' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(contact.id);
        }}
        title={contact.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <i className={`bi ${contact.isFavorite ? 'bi-star-fill' : 'bi-star'}`}></i>
      </button>
      <Link to={`/contact/${contact.id}`} className="contact-row">
        <Avatar contact={contact} />
        <div className="info">
          <div className="name">{fullName(contact)}</div>
          <div className="sub">{contact.email}</div>
        </div>
      </Link>
      <div className="row-actions" ref={menuRef}>
        <button
          className="icon-btn"
          title="Email"
          onClick={() => {
            window.location.href = `mailto:${contact.email}`;
          }}
        >
          <i className="bi bi-envelope"></i>
        </button>
        <button
          className="icon-btn"
          title="Call"
          onClick={() => {
            window.location.href = `tel:${contact.phone}`;
          }}
        >
          <i className="bi bi-telephone"></i>
        </button>
        <div style={{ position: 'relative' }}>
          <button
            className="icon-btn"
            title="More"
            onClick={() => setShowMenu(!showMenu)}
          >
            <i className="bi bi-three-dots-vertical"></i>
          </button>
          {showMenu && (
            <div className="card-menu-dropdown">
              <Link to={`/edit/${contact.id}`} className="card-menu-item" onClick={() => setShowMenu(false)}>Edit</Link>
              <button className="card-menu-item" onClick={() => { deleteContact(contact.id); setShowMenu(false); }}>Delete</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactCard;