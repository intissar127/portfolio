import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import styles from "./styles/ProjectsSection.module.css";
import ProjectCard from "./ProjectCard";
import { useDarkMode } from "./customHooks/useDarkMode";
import { projects } from "./data/projects";

// Detect mobile
const isMobile =
  typeof window !== "undefined" && window.innerWidth <= 768;

function ProjectsSection() {
  const { isDarkMode } = useDarkMode();

  const timelineStyles = {
    content: {
      background: isDarkMode ? "rgba(11, 94, 117, 0.6)" : "#f3f4f6",
      color: isDarkMode ? "#f9fafb" : "#333",
      boxShadow: "0 4px 24px rgba(0, 0, 0, 0.15)",
      borderRadius: "24px",
      border: isDarkMode
        ? "1px solid rgba(255, 255, 255, 0.1)"
        : "1px solid rgba(0, 0, 0, 0.05)",
      padding: isMobile ? "0" : "20px",
    },
    arrow: {
      borderRight: isDarkMode
        ? "7px solid rgba(11, 94, 117, 0.6)"
        : "7px solid #f3f4f6",
    },
  };

  return (
    <section id="projects" className={styles.projectsContainer}>
      
      {/* 🔥 Animated Title */}
      <motion.h2
        className={styles.sectionTitle}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        My Projects
      </motion.h2>

      <VerticalTimeline animate={!isMobile} layout="2-columns">
        {projects.map((project, index) => (
          <VerticalTimelineElement
            key={project.id}
            contentStyle={timelineStyles.content}
            contentArrowStyle={timelineStyles.arrow}
            iconClassName={styles.timelineIconWrapper}
            icon={<div />}
          >
            {/* Animated Cards */}
            {isMobile ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ) : (
              <Tilt options={{ max: 15, scale: 1.02, speed: 400 }}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              </Tilt>
            )}
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </section>
  );
}

export default ProjectsSection;