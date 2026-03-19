import { lazy, Suspense, useMemo } from "react";
import * as THREE from "three";
import styles from "./styles/home.module.css";
import { useDarkMode } from "./customHooks/useDarkMode";

const HomeCanvas = lazy(() => import("./HomeCanvas"));

export default function Home() {
  const { isDarkMode } = useDarkMode();

  const themeColors = useMemo(() => ({
    background: isDarkMode ? "#050a15" : "#70519e",
    atomColor: isDarkMode ? new THREE.Color("#00f2ff") : new THREE.Color("#922cba"),
    electronColor: isDarkMode ? new THREE.Color("#ff00ff") : new THREE.Color("#af3bcf"),
    trailColor: isDarkMode ? new THREE.Color("#ff0055") : new THREE.Color("#10c4c4"),
  }), [isDarkMode]);

  return (
    <div className={styles.homePage}>
      <section className={styles.heroSection}>
        <div 
          className={styles.home} 
          style={{ backgroundColor: themeColors.background }}
        >
          <Suspense fallback={<div className={styles.loader}>Loading Universe...</div>}>
            <HomeCanvas themeColors={themeColors} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}