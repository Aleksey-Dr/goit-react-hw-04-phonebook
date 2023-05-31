import PropTypes from 'prop-types';
import clsx from 'clsx';

import css from './Filter.module.css';

const Filter = ({ filter, onChange }) => {
    return (
        <label>Find contacts by name
            <input className={clsx(css['filter-input'])}
              type="text"
              value={filter}
              onChange={onChange}
            />
        </label>
    );
};

Filter.propTypes = {
    filter: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

export default Filter;