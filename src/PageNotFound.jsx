import { useMoveBack } from "./customHooks/useMoveBack";
import Button from "./reusable_UI/Button";
import styles from "./styles/PageNotFound.module.css";
import "./styles/PageNotFound.module.css";

function PageNotFound() {
  const moveBack = useMoveBack();
  return (
    <div className={styles.foundContainer}>
      <h1 className={styles.foundTitle}>
        The page you are looking for could not be found !
      </h1>
      <img
        src="./img/not_found.jpg"
        alt="Not Found"
        height="260px"
        width="423px"
        className={styles.foundimg}
      />
      <div className={styles.foundBtn}>
        <Button
          onClick={() => {
            console.log("Button clicked! Calling moveBack...");
            moveBack();
          }}
        >
          Go back
        </Button>
      </div>
    </div>
  );
}

export default PageNotFound;
