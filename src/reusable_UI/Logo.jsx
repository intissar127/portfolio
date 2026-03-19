import { useDarkMode } from "../customHooks/useDarkMode";
function Logo() {
  const { isDarkMode } = useDarkMode();
  const src = isDarkMode ? "/img/LOGO_LIGHTu.png" : "/img/LOGO_Dark.png";
  return <img src={src} alt="Logo of my name" height="86px" width="370px" />;
}

export default Logo;
