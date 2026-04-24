import profileImg from "../assets/profile-img.jpg";
import { FaMoon } from "react-icons/fa";
const Sidebar = ({darkMode, setDarkMode}) => {
  
  function toggleDarkMode() {
    setDarkMode((prev) => !prev);
  }
  return (
    <div className="sidebar-container">
      <div className="sidebar-menu">
        <div className="sidebar-style"></div>
      </div>
      <div className="lower-menu">
        <span className="dark-mode" onClick={toggleDarkMode}>
          <FaMoon size={20} color="#888eb0" />
        </span>
        <div className="img-container">
          <img src={profileImg} alt="Profile Picture" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
