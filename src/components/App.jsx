import { Component } from 'react';
import shortid from 'shortid';

import contacts from '../data/contacts';

import ContactForm from './contactForm';
import Filter from './filter';
import ContactList from './contactList';

export class App extends Component {
  state = {
    contacts: contacts,
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    parsedContacts &&
      this.setState({
        contacts: parsedContacts,
      });
  };

  componentDidUpdate(_, prevState) {
    this.state.contacts !== prevState.contacts &&
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
  };

  addContact = (name, number) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    let includesName = false;
    this.state.contacts.map(contact => {
      contact.name === name && (includesName = true);
      return includesName;
    });

    includesName
      ? alert(name + ' is already in contacts')
      : this.setState(({ contacts }) => ({
          contacts: [contact, ...contacts],
        }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = event => {
    this.setState({
      filter: event.currentTarget.value,
    });
  };

  render() {
    const { filter } = this.state;

    const normalizedFilter = this.state.filter.toLowerCase();
    const filterContacts = this.state.contacts.filter(contact =>
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

        <ContactForm onSubmit={this.addContact} />

        <h3>Contacts</h3>
        <Filter value={filter} onChange={this.changeFilter} />

        <ContactList
          onDeleteContact={this.deleteContact}
          filterContacts={filterContacts}
        />
      </div>
    );
  }
}
