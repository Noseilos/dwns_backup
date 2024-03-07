import React from "react";
import styles from "../components/styles/Admin.module.css";
import PageNav from "../components/PageNav";

const Account = () => {
  const user = {
    name: "John Doe",
    email: "john@example.com",
    photo: "example-photo.jpg",
  };

  const handleSubmitUserData = (event) => {
    // Handle submit user data
    event.preventDefault();
    // Implement your logic here
  };

  const handleSubmitPasswordChange = (event) => {
    // Handle submit password change
    event.preventDefault();
    // Implement your logic here
  };

  return (
    <main className={styles.adminpage}>
      <PageNav />
      <div></div>
      <div className={styles.user_view}>
        <nav className={styles.user_view__menu}>
          <ul className={styles.side_nav}>
            <li className={styles.side_nav__active}>
              <a href="#">
                <svg>
                  <use xlinkHref="img/icons.svg#icon-settings"></use>
                </svg>
                Settings
              </a>
            </li>
            <li>
              <a href="/my-reports">
                <svg>
                  <use xlinkHref="img/icons.svg#icon-briefcase"></use>
                </svg>
                My Reports
              </a>
            </li>
            {/* <li>
              <a href="#">
                <svg>
                  <use xlinkHref="img/icons.svg#icon-star"></use>
                </svg>
                My reviews
              </a>
            </li>
            <li>
              <a href="#">
                <svg>
                  <use xlinkHref="img/icons.svg#icon-credit-card"></use>
                </svg>
                Billing
              </a>
            </li> */}
            {user.role === "admin" && (
              <div className={styles.admin_nav}>
                <h5 className={styles.admin_nav__heading}>Admin</h5>
                <li>
                  <a href="#">
                    <svg>
                      <use xlinkHref="img/icons.svg#icon-map"></use>
                    </svg>
                    Manage reports
                  </a>
                </li>
                <li>
                  <a href="#">
                    <svg>
                      <use xlinkHref="img/icons.svg#icon-users"></use>
                    </svg>
                    Manage users
                  </a>
                </li>
                <li>
                  <a href="#">
                    <svg>
                      <use xlinkHref="img/icons.svg#icon-star"></use>
                    </svg>
                    Manage reviews
                  </a>
                </li>
                <li>
                  <a href="#">
                    <svg>
                      <use xlinkHref="img/icons.svg#icon-briefcase"></use>
                    </svg>
                    Manage bookings
                  </a>
                </li>
              </div>
            )}
          </ul>
        </nav>
        <div className={styles.user_view__content}>
          <div className={styles.user_view__form_container}>
            <h2 className={`${styles.heading_secondary} ma-bt-md`}>
              Your account settings
            </h2>
            <form
              className={`${styles.form} form-user-data`}
              onSubmit={handleSubmitUserData}
            >
              <div className={styles.form__group}>
                <label className={styles.form__label} htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  className={styles.form__input}
                  type="text"
                  value={user.name}
                  style={{ color:"black" }}
                  required
                  name="name"
                />
              </div>
              <div className={`${styles.form__group} ma-bt-md`}>
                <label className={styles.form__label} htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  className={styles.form__input}
                  type="email"
                  style={{ color:"black" }}
                  value={user.email}
                  required
                  name="email"
                />
              </div>
              <div
                className={`${styles.form__group} ${styles.form__photo_upload}`}
              >
                <img
                  className={styles.form__user_photo}
                  src={`/img/users/default.jpg`}
                  alt="User photo"
                />
                <input
                  className={styles.form__upload}
                  type="file"
                  accept="image/*"
                  id="photo"
                  name="photo"
                />
                <label htmlFor="photo">Choose New Photo</label>
              </div>
              <div className={`${styles.form__group} right`}>
                <button
                  className={`${styles.btn} ${styles["btn__small"]} ${styles["btn__green"]}`}
                  type="submit"
                >
                  Save settings
                </button>
              </div>
            </form>
          </div>
          <div className={styles.line}>&nbsp;</div>
          <div className={styles.user_view__form_container}>
            <h2 className={`${styles.heading_secondary} ma-bt-md`}>
              Password change
            </h2>
            <form
              className={`${styles.form} form-user-password`}
              onSubmit={handleSubmitPasswordChange}
            >
              <div className={styles.form__group}>
                <label
                  className={styles.form__label}
                  htmlFor="password-current"
                >
                  Current password
                </label>
                <input
                  id="password-current"
                  className={styles.form__input}
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength="6"
                />
              </div>
              <div className={styles.form__group}>
                <label className={styles.form__label} htmlFor="password">
                  New password
                </label>
                <input
                  id="password"
                  className={styles.form__input}
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength="6"
                />
              </div>
              <div className={`${styles.form__group} ma-bt-lg`}>
                <label
                  className={styles.form__label}
                  htmlFor="password-confirm"
                >
                  Confirm password
                </label>
                <input
                  id="password-confirm"
                  className={styles.form__input}
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength="6"
                />
              </div>
              <div className={`${styles.form__group} right`}>
                <button
                  className={`${styles.btn} ${styles["btn__small"]} ${styles["btn__green"]}`}
                  type="submit"
                >
                  Save password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Account;
