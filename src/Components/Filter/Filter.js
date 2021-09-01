import shortid from 'shortid';
import PropTypes from 'prop-types';
import s from '../Filter/Filter.module.css';

export default function Filter({ filter, onChange }) {
  const filterId = shortid.generate();
  return (
    <label htmlFor={filterId} className={s.label}>
      Find contacts by name
      <input
        id={filterId}
        type="text"
        name="filter"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
        required
        value={filter}
        onChange={onChange}
        className={s.input}
      />
    </label>
  );
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
