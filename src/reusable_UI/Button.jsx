import styles from "../styles/Button.module.css";

import { PropTypes } from "prop-types";
const Button = ({ children, onClick }) => {
  return (
    <button className={styles.btn} onClick={onClick}>
      {children}
      <span className={styles.arrow}>&rarr;</span>
    </button>
  );
};
Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
