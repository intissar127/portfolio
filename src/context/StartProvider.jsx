import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { StartContext } from "./StartContext";

export function StartProvider({ children }) {
  const [started, setStarted] = useState(() => {
    return localStorage.getItem("started") === "false";
  });

  const startAnimation = () => {
    setStarted(true);
    localStorage.setItem("started", "true");
  };

  useEffect(() => {
    const isRefresh =
      performance.getEntriesByType("navigation")[0]?.type === "reload";

    if (isRefresh) {
      // If refreshed, clear storage and reset started
      localStorage.removeItem("started");
      setStarted(false); // ✅ show StartPage again
    }
  }, []);

  return (
    <StartContext.Provider value={{ started, startAnimation }}>
      {children}
    </StartContext.Provider>
  );
}

StartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
