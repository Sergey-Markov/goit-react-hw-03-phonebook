import s from '../Contacts/Contacts.module.css';
import PropTypes from 'prop-types';

export default function Contacts({ contacts, onClick }) {
  return (
    <ul className={s.list}>
      {contacts.map(contact => {
        const { id, name, number } = contact;
        return (
          <li key={id} className={s.item}>
            {name}: {number}
            <button
              type="button"
              onClick={() => onClick(id)}
              className={s.button}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
}

Contacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
