import PropTypes from 'prop-types';
import clsx from 'clsx';

import css from './ContactsItem.module.css';

const ContactsItem = ({ id, name, number, onDeleteContact }) => {
  return (
    <>
      <li className={clsx(css['contacts-item'])}>
        <span>
          {name}: {number}
        </span>
        <button type="button" onClick={() => onDeleteContact(id)}>
          Delete
        </button>
      </li>
    </>
  );
};

ContactsItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactsItem;
