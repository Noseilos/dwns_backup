import styles from "./styles/Admin.module.css";
function Footer() {
  return (
    // <footer className={styles.footer}>
    //   <p className={styles.copyright}>
    //     &copy; Copyright {new Date().getFullYear()} by Municipal Waste Trove
    //     Inc.
    //   </p>
    // </footer>

    <footer className={styles.footer}>
      <div className={styles.footer__logo}>
        <img src="/img/logo-green.png" alt="DWN Logo" />
      </div>
      <ul className={styles.footer__nav}>
        <li>
          <a href="#">About us</a>
        </li>
        <li>
          <a href="#">Download apps</a>
        </li>
        <li>
          <a href="#">Become a guide</a>
        </li>
        <li>
          <a href="#">Careers</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
      <p className={styles.footer__copyright}>&copy; by Jonas and Mark.</p>
    </footer>
  );
}

export default Footer;
