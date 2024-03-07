import { Link } from "react-router-dom";
import styles from "./styles/Homepage.module.css";
import PageNav from "../components/PageNav";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          Municipal Waste Trove: A Data-driven Analysis
          <br />
          And Strategy To Sustainable Waste Management In Upper Bicutan and
          South Signal Village
        </h1>
        <h2>
          Explore the waste landscape of Upper Bicutan and South Signal Village
          through data-driven insights. Our analysis provides a comprehensive
          strategy for sustainable waste management in these areas.
        </h2>
        <Link to="/app" className="cta">
          Start
        </Link>
      </section>
    </main>
  );
}
