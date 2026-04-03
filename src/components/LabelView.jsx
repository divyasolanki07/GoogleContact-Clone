import React from 'react';
import { useParams } from 'react-router-dom';
import ContactList from './ContactList';

const LabelView = ({ contacts, q, toggleFavorite, deleteContact }) => {
  const { name } = useParams();
  const filtered = contacts.filter(
    (c) => c.label && c.label.toLowerCase() === name.toLowerCase()
  );
  return (
    <ContactList
      contacts={filtered}
      q={q}
      title={name.charAt(0).toUpperCase() + name.slice(1)}
      toggleFavorite={toggleFavorite}
      deleteContact={deleteContact}
    />
  );
};

export default LabelView;
