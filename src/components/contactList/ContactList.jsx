import PropTypes from 'prop-types';

import ContactsItem from '../contactsItem';

const ContactList = ({ filterContacts, onDeleteContact }) => {
  return (
    <div>
      <ul>
        {filterContacts.map(({ id, name, number }) => {
          return (
            <ContactsItem
              key={id}
              id={id}
              name={name}
              number={number}
              onDeleteContact={onDeleteContact}
            />
          );
        })}
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  filterContacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
