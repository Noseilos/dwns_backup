import PageNav from "../components/PageNav";
import styles from "./styles/About.module.css";

function Services() {
  return (
    <main className={styles.about}>
      <PageNav/>
      <section>
        <div>
          <h2>
            Diverse Programs
          </h2>
          <p>
            Discover our range of programs designed to address specific community needs. Whether it's waste education, recycling initiatives, or community clean-up drives, our programs cater to various aspects of sustainable living. Join us in creating a positive impact on our environment and community.
          </p>
        </div>
        <img src="image-2.jpg" alt="overview of a large city with skyscrapers" />
      </section>
    </main>
  );
}

export default Services;
