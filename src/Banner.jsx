import PropTypes from "prop-types";
import styles from "./styles/Banner.module.css";
function Banner({ children }) {
  return (
    <div className={styles.scrollingBanner}>
      <p className={styles.mantra}>{children}</p>
    </div>
  );
}
Banner.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Banner;
