// src/StartPage.jsx
import { useState } from "react";
import styles from "./styles/StartPage.module.css";
import ButtonStart from "./reusable_UI/ButtonStart";
import { useStart } from "./customHooks/useStart";

function StartPage() {
  const { startAnimation } = useStart();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => startAnimation(), 500);
  };

  return (
    <div className={styles.startContainer}>
      <h1 className={styles.startText}>
        ST
        <span className={`${isAnimating ? styles.animateA : ""}`}>A</span>
        RT
      </h1>
      {!isAnimating && (
        <ButtonStart onClick={handleClick} className={styles.neonButton}>
          Begin!
        </ButtonStart>
      )}
    </div>
  );
}

export default StartPage;
