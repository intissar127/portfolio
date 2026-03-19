import { useEffect,useState } from "react";
export function useActiveSection(sectionRefs) {
    const [activeSection, setActiveSection] = useState(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
           
            { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
        );

        sectionRefs.forEach((ref) => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });
        return () => {
            observer.disconnect();
        };
    }, [sectionRefs]);
    return activeSection;
}