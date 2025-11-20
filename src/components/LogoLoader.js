import logo from "../assets/logo1.png"; // ⬅️ change path to your logo
import "../styles/logoLoader.css";

const LogoLoader = () => {
  return (
    <div className="logo-loader">
      <img src={logo} alt="Loading..." className="logo-loader__image" />
    </div>
  );
};

export default LogoLoader;
