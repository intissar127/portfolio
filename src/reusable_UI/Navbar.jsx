import Logo from "./Logo";
import DarkModeToggle from "./DarkModeToggle";
import styles from "../styles/Navbar.module.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
function Navbar({ scrollTo, activeSection }) {
  const navigate = useNavigate();
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Logo />
      </div>

      <ul>
        <li>
          <a
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/about")}
            className={`${styles.link}`}
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#projects"
            onClick={(e) => scrollTo(e, "projects")}
            className={`${styles.link} ${activeSection === "projects" ? styles.active : ""}`}
          >
            Projects
          </a>
        </li>
        <li>
          <a
            href="#contact"
            onClick={(e) => scrollTo(e, "contact")}
            className={`${styles.link} ${activeSection === "contact" ? styles.active : ""}`}
          >
            Contact
          </a>
        </li>
        <li>
          <DarkModeToggle />
        </li>
      </ul>
    </nav>
  );
}
Navbar.propTypes = {
  scrollTo: PropTypes.func, // This makes it optional
  activeSection: PropTypes.string,
};
export default Navbar;
