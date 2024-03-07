import { NavLink } from "react-router-dom";
import styles from "./styles/PageNav.module.css";
import { getUser, logout } from "../utils/helpers";
import AccountMenu from "./mui/AccountMenu"
import Logo from "./Logo";
import { Fragment, useEffect, useState } from "react";

function PageNav() {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(getUser());
  }, []);

  const logoutHandler = () => {
    logout();
    // toast.success("Logged out", {
    //   position: toast.POSITION.BOTTOM_RIGHT,
    // });
    setTimeout(() => {
      window.location.reload();
    }, 0);
  };
  return (
    <nav className={styles.nav}>
      <ul>
        <Logo />
        <li>
          <NavLink to="/services">Programs</NavLink>
        </li>
        <li>
          <NavLink to="/news">News</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        
        {/* <li><AccountMenu/></li> */}
      </ul>
      <ul>{user ? (
          <>
            <li><AccountMenu/></li>
            {/* <NavLink className={styles.ctaLink} to="/" onClick={logoutHandler}>
              Logout
            </NavLink> */}
          </>
        ) : (
          <Fragment>
            <li>
              <NavLink to="/login" className={styles.ctaLink2}>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className={styles.ctaLink}>
                Register
              </NavLink>
            </li>{" "}
          </Fragment>
        )}</ul>
    </nav>
  );
}

export default PageNav;
