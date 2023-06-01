import { useState, useEffect } from 'react';
import shortid from 'shortid';

import date from '../data/contacts';

import ContactForm from './contactForm';
import Filter from './filter';
import ContactList from './contactList';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? date
});
  const [filter, setFilter] = useState('');

  useEffect(() => {
      window.localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]
  );

  const addContact = (name, number) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    let includesName = false;
    contacts.map(contact => {
      contact.name === name && (includesName = true);
      return includesName;
    });

    includesName
      ? alert(name + ' is already in contacts')
      : setContacts([contact, ...contacts]);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const changeFilter = event => setFilter(event.currentTarget.value);

  const normalizedFilter = filter.toLowerCase();
  const filterContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <div
      style={{
        boxSizing: 'border-box',
        width: '420px',
        margin: '20px',
      }}
    >
      <h2>Phonebook</h2>

      <ContactForm onSubmit={addContact} />

      <h3>Contacts</h3>
      <Filter value={filter} onChange={changeFilter} />

      <ContactList
        onDeleteContact={deleteContact}
        filterContacts={filterContacts}
      />
    </div>
  );
};
