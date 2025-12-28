import logo from "../assets/logo1.png"; // ⬅️ change path to your logo
import "../styles/logoLoader.css";

const LogoLoader = ({ width = 150, height = 150 }) => {
  return (
    <div className="logo-loader">
      <img
        src={logo}
        alt="Loading..."
        className="logo-loader__image"
        width={width}
        height={height}
      />
    </div>
  );
};

export default LogoLoader;
