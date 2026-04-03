import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ContactList from './components/ContactList';
import ContactDetail from './components/ContactDetail';
import ContactForm from './components/ContactForm';
import PlaceholderPage from './components/PlaceholderPage';
import LabelView from './components/LabelView';

const AppRouter = ({ contacts, setContacts, q, toggleFavorite, deleteContact }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ContactList
            contacts={contacts.filter((c) => !c.isDeleted)}
            q={q}
            toggleFavorite={toggleFavorite}
            deleteContact={deleteContact}
          />
        }
      />
      <Route
        path="/contact/:id"
        element={<ContactDetail contacts={contacts} toggleFavorite={toggleFavorite} deleteContact={deleteContact} />}
      />
      <Route path="/new" element={<ContactForm contacts={contacts} setContacts={setContacts} />} />
      <Route path="/edit/:id" element={<ContactForm contacts={contacts} setContacts={setContacts} edit />} />
      <Route path="/frequent" element={<ContactList contacts={contacts.filter(c => !c.isDeleted && c.isFavorite)} q={q} title="Frequently contacted" toggleFavorite={toggleFavorite} deleteContact={deleteContact} />} />
      <Route path="/directory" element={<PlaceholderPage icon="bi-building" title="Directory" desc="Your organization's contacts will appear here." />} />
      <Route
        path="/label/:name"
        element={<LabelView contacts={contacts.filter((c) => !c.isDeleted)} q={q} toggleFavorite={toggleFavorite} deleteContact={deleteContact} />}
      />
      <Route path="/trash" element={<ContactList contacts={contacts.filter(c => c.isDeleted)} q={q} title="Trash" toggleFavorite={toggleFavorite} deleteContact={deleteContact} />} />
      <Route path="/merge" element={<PlaceholderPage icon="bi-intersect" title="Merge & fix" desc="Duplicate contacts will appear here." />} />
      <Route path="/import" element={<PlaceholderPage icon="bi-upload" title="Import contacts" desc="Upload a CSV or vCard file." />} />
      <Route path="/export" element={<PlaceholderPage icon="bi-download" title="Export contacts" desc="Download your contacts as a CSV or vCard." />} />
    </Routes>
  );
};

export default AppRouter;
