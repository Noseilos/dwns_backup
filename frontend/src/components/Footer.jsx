import styles from "./styles/Footer.module.css"
function Footer() {
  return (
    <footer className={styles.footer}>
    <p className={styles.copyright}>
      &copy; Copyright {new Date().getFullYear()} by Municipal Waste Trove
      Inc.
    </p>
  </footer>
  
  )
}

export default Footer