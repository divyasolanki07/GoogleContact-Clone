import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import AppRouter from './AppRouter';
import { SEED } from './utils/contacts';
function App() {
  const [q, setQ] = useState('');
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem('googleContactsData');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return SEED;
      }
    }
    return SEED;
  });

  useEffect(() => {
    localStorage.setItem('googleContactsData', JSON.stringify(contacts));
  }, [contacts]);

  const toggleFavorite = (id) => {
    setContacts((cs) =>
      cs.map((c) => (c.id === id ? { ...c, isFavorite: !c.isFavorite } : c))
    );
  };

  const deleteContact = (id) => {
    if (window.confirm('Move to Trash?')) {
      setContacts((cs) => cs.map((c) => c.id === id ? { ...c, isDeleted: true } : c));
    }
  };

  return (
    <>
      <TopBar q={q} setQ={setQ} />
      <div className="app-layout">
        <Sidebar />
        <main className="main">
          <AppRouter 
            contacts={contacts} 
            setContacts={setContacts} 
            q={q} 
            toggleFavorite={toggleFavorite} 
            deleteContact={deleteContact} 
          />
        </main>
      </div>

      <Link to="/new" className="fab d-flex d-md-none" title="New contact">
        <i className="bi bi-plus-lg"></i>
      </Link>
    </>
  );
}

export default App;
