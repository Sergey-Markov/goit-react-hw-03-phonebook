import { Component } from 'react';
import shortid from 'shortid';
import s from './App.module.css';
import Contacts from './Components/Contacts/Contacts';
import Filter from './Components/Filter/Filter';
import Form from './Components/Form/Form';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  componentDidMount() {
    const currentContacts = localStorage.getItem('contacts');
    const parsedCurrentContacts = JSON.parse(currentContacts);

    if (parsedCurrentContacts) {
      this.setState({ contacts: parsedCurrentContacts });
    }
  }

  componentDidUpdate(prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addToDataContacts = data => {
    if (this.state.contacts.find(contact => contact.name === data.name)) {
      alert(`${data.name} is already created!`);
      return;
    }

    const newContact = {
      id: shortid.generate(),
      ...data,
    };
    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
    }));
  };
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  onFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };
  filteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizeFilter = filter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter),
    );
  };

  render() {
    const filteredContacts = this.filteredContacts();
    return (
      <div className={s.App}>
        <h1 className={s.title}>Phonebook</h1>
        <Form onSubmit={this.addToDataContacts} />
        <h2 className={s.title}>Contacts:</h2>
        <Filter filter={this.state.filter} onChange={this.onFilter} />
        <Contacts contacts={filteredContacts} onClick={this.deleteContact} />
      </div>
    );
  }
}

export default App;
