import { useMoveBack } from "./customHooks/useMoveBack";
import Button from "./reusable_UI/Button";
import styles from "./styles/VideoPage.module.css";
// import { className } from './projects/conf-talk/node_modules/@sinonjs/commons/lib';
function VideoPage() {
  const moveBack = useMoveBack();
  return (
    <section className={styles.VideoContainer}>
      <h1 className={styles.VideoTitle}>Meet Me in 60 seconds!</h1>
      <div className={styles.Video}></div>

      <div className={styles.Video}>
        <video className={styles.VideoPlayer} controls>
          <source src="img/introduction.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className={styles.VideoBtn}>
        <Button
          onClick={() => {
            moveBack();
          }}
        >
          Go back
        </Button>
      </div>
    </section>
  );
}

export default VideoPage;
