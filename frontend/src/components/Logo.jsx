import { Link } from "react-router-dom";
import styles from "./styles/Logo.module.css";

function Logo() {
  return (
    <Link to="/">
      <img src="/MWTlogo.png" alt="DWN Logo" className={styles.logo} />
    </Link>
  );
}

export default Logo;
