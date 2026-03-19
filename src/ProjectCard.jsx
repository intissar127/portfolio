import PropTypes from "prop-types";
import styles from "./styles/ProjectCard.module.css";

function ProjectCard({ project }) {
  // Check if any links exist to avoid rendering an empty container
  const hasLinks = project.github || (project.demo && project.demo.trim() !== "");

  return (
    <div className={styles.card}>
      <h1 className={styles.projectTitle}>{project.title}</h1>
      <p className={styles.description}>{project.description}</p>

      <div className={styles.skillsContainer}>
        {project.skills.map((skill) => (
          <div key={`${project.id}-${skill.name}`} className={styles.skill}>
            <img src={skill.image} alt={skill.name} className={styles.img} />
            <span className={styles.name}>{skill.name}</span>
          </div>
        ))}
      </div>

      {/* The entire container only renders if at least one link exists */}
      {hasLinks && (
        <div className={styles.linksContainer}>
          {project.github && (
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.link}
            >
              View GitHub
            </a>
          )}
          {project.demo && project.demo.trim() !== "" && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Live Demo
            </a>
          )}
        </div>
      )}
    </div>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    github: PropTypes.string,
    demo: PropTypes.string,
    skills: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default ProjectCard;