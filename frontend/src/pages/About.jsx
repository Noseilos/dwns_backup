import PageNav from "../components/PageNav";
import styles from "./styles/About.module.css";

function About() {
  return (
    <main className={styles.about}>
      <PageNav/>
      <section>
        <img
          src="MWT.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>About Municipal Waste Trove.</h2>
          <p>
            Discover the story behind Municipal Waste Trove, a project committed to sustainable waste management in Upper Bicutan and South Signal Village. Learn about our mission to create a cleaner and greener environment through data-driven solutions.
          </p>
          <p>
            Explore the challenges, initiatives, and aspirations that drive our commitment to responsible waste management in these communities.
          </p>
        </div>
      </section>
    </main>
  );
}

export default About;
