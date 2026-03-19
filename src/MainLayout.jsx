import { useRef, useState, useEffect, useMemo } from "react";
import Navbar from "./reusable_UI/Navbar"; // 1. Add this import (check your path)
import ProjectsSection from "./ProjectsSection";
import WhyRecruitMeSection from "./reusable_UI/WhyRecruitMeSection";
import ContactSection from "./ContactSection";
import Cube3d from "./threejs/Cube3d";
import { useActiveSection } from "./customHooks/useActiveSection";
import { Canvas } from "@react-three/fiber";
function MainLayout() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const projectsRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const CubeRef = useRef(null);

  const sectionRefs = useMemo(() => [aboutRef, projectsRef, contactRef], [aboutRef, projectsRef, contactRef]);
  const activeSection = useActiveSection(sectionRefs);
  useEffect(() => {
    let rafId;
    const handleMouseMove = (e) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setMouse({
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: -(e.clientY / window.innerHeight) * 2 + 1,
        });
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollTo = (e, section) => {
    e.preventDefault();
    const refs = { projects: projectsRef, contact: contactRef };
    const target = refs[section]?.current;

    if (target) {
      const offset = 110; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      {/* 2. Uncomment this line - This fixes your 'unused' error */}
      <Navbar scrollTo={scrollTo} activeSection={activeSection} />

     

      
      <div id="projects" ref={projectsRef}><ProjectsSection /></div>
      
<div ref={CubeRef} style={{ height: "500px", width: "100%" }}> 
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          
          <Cube3d mouse={mouse} />
        </Canvas>
      </div>
      <WhyRecruitMeSection />

      <div id="contact" ref={contactRef}><ContactSection /></div>
    </>
  );
}

export default MainLayout;