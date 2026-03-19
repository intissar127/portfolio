import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Components & Context
import { DarkModeProvider } from "./context/DarkModeProvider";
import Portfolio from "./Portfolio";
import Home from "./Home";
import AboutPage from "./AboutSection";
import VideoPage from "./VideoPage";
import PageNotFound from "./PageNotFound";
import ChatBubble from "./ChatBubble";

/**
 * RedirectToHome Guard
 * Logic: If the user refreshes the page on any path other than "/", 
 * it snaps them back to the home page immediately.
 */
function RedirectToHome() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only runs ONCE when the app component mounts (on Refresh/Initial Load)
    if (location.pathname !== "/") {
      navigate("/", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  return null;
}

function App() {
  return (
    <div className="app-container">
      <DarkModeProvider>
        <BrowserRouter>
          {/* Snap back to "/" if we are refreshing on a sub-route */}
          <RedirectToHome />


          {/* 2. Dynamic content changes based on URL */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/video" element={<VideoPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>

          {/* 3. Portfolio content (Projects, etc.) remains visible below */}
          <Portfolio />
          
          <ChatBubble />
        </BrowserRouter>
      </DarkModeProvider>
    </div>
  );
}

export default function WrappedApp() {
  return <App />;
}