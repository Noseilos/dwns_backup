import React, { useState, useEffect } from "react";
import axios from "axios";
import PageNav from "../PageNav";
import styles from "../styles/Admin.module.css";

function Overview() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reports, setReports] = useState([]);

  const fetchOverviewData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/overview-data`);
      setReports(response.data.data.reports);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching overview data:", error);
      setError("Error fetching overview data");
    }
  };

  useEffect(() => {
    fetchOverviewData();
  }, []);

  return (
    <div className={styles}>
      <main className={styles.adminpage}>
        <PageNav />
        <div className={styles.card_container}>
          {reports.map((report, index) => (
            <div className={styles.card} key={index}>
              <div className={styles.card__header}>
                <div className={styles.card__picture}>
                  <div className={styles.card__picture_overlay}>&nbsp;</div>
                  <img
                    className={styles.card__picture_img}
                    src={`/img/reports/${report.imageCover}`}
                    alt={report.name}
                  />
                </div>
                <h3 className={styles.heading_tertirary}>
                  <span>{report.name}</span>
                </h3>
              </div>
              <div className={styles.card__details}>
                <h4 className={styles.card__sub_heading}>
                  {`${report.difficulty ?? ""} ${
                    report.duration ? `${report.duration}-day report` : ""
                  }`}
                </h4>
                <p className={styles.card__text}>{report.summary}</p>
                <div className={styles.card__data}>
                  <svg className={styles.card__icon}>
                    <use xlinkHref="/img/icons.svg#icon-map-pin"></use>
                  </svg>
                  <span>{report.startLocation?.description}</span>
                </div>
                <div className={styles.card__data}>
                  <svg className={styles.card__icon}>
                    <use xlinkHref="/img/icons.svg#icon-calendar"></use>
                  </svg>
                  <span>
                    {report.startDates?.[0]
                      ? new Date(report.startDates[0]).toLocaleString("en-us", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })
                      : ""}
                  </span>
                </div>
                <div className={styles.card__data}>
                  <svg className={styles.card__icon}>
                    <use xlinkHref="/img/icons.svg#icon-flag"></use>
                  </svg>
                  <span>{`${report.locations?.length ?? 0} stops`}</span>
                </div>
                <div className={styles.card__data}>
                  <svg className={styles.card__icon}>
                    <use xlinkHref="/img/icons.svg#icon-user"></use>
                  </svg>
                  <span>{`${report.maxGroupSize ?? 0} people`}</span>
                </div>
              </div>
              <div className={styles.card__footer}>
                <p>
                  <span className={styles.card__footer_value}>{`$${
                    report.price ?? 0
                  }`}</span>
                  <span className={styles.card__footer_text}> per person</span>
                </p>
                <p className={styles.card__ratings}>
                  <span className={styles.card__footer_value}>
                    {report.ratingsAverage ?? 0}
                  </span>
                  <span className={styles.card__footer_text}>{` rating (${
                    report.ratingsQuantity ?? 0
                  })`}</span>
                </p>
                <a className={styles.btn} href={`/report/${report.slug}`}>
                  Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Overview;
