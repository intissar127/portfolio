import PropTypes from "prop-types";
import styles from "../styles/ButtonStart.module.css";
import "../styles/ButtonStart.module.css";

function ButtonStart({ onClick, children }) {
  return (
    <button className={styles.startButton} onClick={onClick}>
      <svg
        className={styles.playIcon}
        width="70"
        height="70"
        viewBox="0 0 24 24"
        fill="black"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8 5v14l11-7z" />
      </svg>
      <span className={styles.text}>{children}</span>
    </button>
  );
}

// ✅ PropTypes Validation
ButtonStart.propTypes = {
  onClick: PropTypes.func.isRequired, // Ensures onClick is a function and required
  children: PropTypes.node.isRequired, // Ensures children can be any renderable content (text, elements, etc.)
};

export default ButtonStart;
