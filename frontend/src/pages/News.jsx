import Footer from "../components/Footer";
import PageNav from "../components/PageNav";
import styles from "./styles/News.module.css";

function News() {
  return (
    <>  <main className={styles.news}>
    <PageNav/>
    <section>
        <div>
      <img src="image-2.jpg" alt="overview of a large city with skyscrapers" />

        </div>
      <div>
        <h2>
          {/* {news.post} */}
        </h2>
        <p>
          Discover our range of programs designed to address specific community needs. Whether it's waste education, recycling initiatives, or community clean-up drives, our programs cater to various aspects of sustainable living. Join us in creating a positive impact on our environment and community.
        </p>
      </div>
    </section>
 
  </main>
  <Footer/>
  </>

  )
}

export default News