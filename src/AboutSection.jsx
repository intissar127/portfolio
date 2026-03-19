import Button from "./reusable_UI/Button";
import styles from "./styles/About.module.css";
import { useNavigate } from "react-router-dom";
function AboutSection() {
  const navigate = useNavigate();

  const goToVideo = () => {
    console.log("Navigating to /video");
    navigate("/video");
  };
  return (
    <section>
      <img
        src="img/my_image.jpg"
        alt="My image"
        height="550px"
        className={styles.img}
      />
      <div className={styles.intro}>
        <h1>
          Hi, I am <br />
          <span className={styles.myName}>Intissar Massaoud</span>
        </h1>

        <div className={styles.description}>
  <p>
    I am a second-year engineering student at the Higher Institute of 
    Computer Science and Multimedia of Sfax (ISIMS), Tunisia. 
    
  </p>
  <p>
    I am eager to gain hands-on experience through a summer internship.
 I specialize in ReactJs and NodeJs together
    combined with artificial intelligence. 
    I thrive in dynamic environments where I can contribute to 
    impactful projects.
  </p>
</div>
        <Button onClick={goToVideo}>skip and see video instead!</Button>
      </div>
    </section>
  );
}

export default AboutSection;
