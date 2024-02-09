import PropTypes from "prop-types";
import styles from "./Button.module.css";

const Button = ({ children, onClick, type }) => {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.any.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.any.isRequired,
};

export default Button;