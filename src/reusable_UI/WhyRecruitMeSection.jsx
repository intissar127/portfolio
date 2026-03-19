import { useState } from "react";
import styles from "../styles/WhyRecruitMeSection.module.css";

function WhyRecruitMeSection() {
  // Set initial position to center so it's not dark on load
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50, isPercent: true });

  const handleMouseMove = (e) => {
    // Get the bounding box of the element to calculate relative position
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isPercent: false
    });
  };

  // Add touch support for mobile
  const handleTouchMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    setMousePosition({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
      isPercent: false
    });
  };

  const xPos = mousePosition.isPercent ? `${mousePosition.x}%` : `${mousePosition.x}px`;
  const yPos = mousePosition.isPercent ? `${mousePosition.y}%` : `${mousePosition.y}px`;

  return (
    <div
      className={styles.content}
      style={{
        background: `radial-gradient(circle at ${xPos} ${yPos}, rgb(248, 238, 216) 10%, rgba(0, 0, 0, 1) 70%)`,
      }}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove} 
    >
      <h1 className={styles.title}>Hire Me Before Elon Musk Does! 👩🏻‍💻</h1>
      <h3 className={styles.tertiarytTitle}>Why you should hire me?</h3>
      <div className={styles.paragraph}>
        I bring a unique blend of technical expertise, problem-solving skills,
        and a passion for clean code. My adaptability allows me to
        thrive in dynamic environments. Beyond technical skills, I am a
        collaborative team player who values clear communication and continuous
        improvement. With my drive for
        excellence, I am confident in my ability to contribute meaningfully to
        your projects.
      </div>
    </div>
  );
}

export default WhyRecruitMeSection;