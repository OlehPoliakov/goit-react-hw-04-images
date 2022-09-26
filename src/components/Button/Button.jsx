import PropTypes from 'prop-types';
import { BiPlusMedical } from 'react-icons/bi';
import s from './Button.module.css';

function Button({ onNextFetch }) {
  return (
    <button className={s.button} type="button" onClick={onNextFetch}>
      Load more <BiPlusMedical className={s.icon} />
    </button>
  );
}

Button.prototype = {
  onNextFetch: PropTypes.func.isRequired,
};

export default Button;
