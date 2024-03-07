import { Link } from "react-router-dom";
import styles from "./styles/Logo.module.css";

function Logo() {
  return (
    <Link to="/">
      <img src="/MWTlogo.png" alt="WorldWise logo" className={styles.logo} />
    </Link>
  );
}

export default Logo;