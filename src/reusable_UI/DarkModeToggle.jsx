import { useDarkMode } from "../customHooks/useDarkMode";
import styles from "../styles/DarkModeToggle.module.css";
import Moon from "./Moon";
import Sun from "./Sun";

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <label className={styles.toggle}>
      <input
        type="checkbox"
        className={styles.toggleInput}
        checked={isDarkMode}
        onChange={toggleDarkMode}
      />
      <div className={styles.toggleBg}></div>
      <div className={styles.toggleSwitch}>
        {isDarkMode ? <Moon /> : <Sun />}
      </div>
    </label>
  );
}

export default DarkModeToggle;
