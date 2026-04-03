import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import ContactCard from './ContactCard';

const fullName = (c) => `${c.first} ${c.last}`;

const ContactList = ({ contacts, q, title = 'Contacts', toggleFavorite, deleteContact }) => {
  const filtered = useMemo(() => {
    const s = q.toLowerCase();
    return contacts.filter(
      (c) =>
        fullName(c).toLowerCase().includes(s) ||
        c.email.toLowerCase().includes(s) ||
        c.phone.includes(s)
    );
  }, [contacts, q]);

  const grouped = useMemo(() => {
    const g = {};
    [...filtered]
      .sort((a, b) => fullName(a).localeCompare(fullName(b)))
      .forEach((c) => {
        const char = (c.last && c.last[0]) ? c.last[0] : (c.first && c.first[0]) ? c.first[0] : '#';
        const k = char.toUpperCase();
        (g[k] = g[k] || []).push(c);
      });
    return g;
  }, [filtered]);

  return (
    <div className="page-contacts">
      <div className="contacts-toolbar">
        <h1>{title}</h1>
        <span style={{ fontSize: 13, color: 'var(--on-surface-variant)' }}>
          {filtered.length} contacts
        </span>
        <button className="sort-btn">
          <i className="bi bi-sort-alpha-down"></i> Name
        </button>
      </div>

      {!filtered.length ? (
        <div className="empty-state">
          <i className="bi bi-search"></i>
          <h3>{q ? `No results for "${q}"` : `No contacts in ${title}`}</h3>
          <p>Try a different name, email, or phone number.</p>
        </div>
      ) : (
        Object.keys(grouped)
          .sort()
          .map((letter) => (
            <div className="alpha-section" key={letter}>
              <div className="alpha-header">{letter}</div>
              {grouped[letter].map((c) => (
                <ContactCard
                  key={c.id}
                  contact={c}
                  toggleFavorite={toggleFavorite}
                  deleteContact={deleteContact}
                />
              ))}
            </div>
          ))
      )}
    </div>
  );
};

export default ContactList;
