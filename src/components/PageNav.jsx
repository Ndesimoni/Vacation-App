import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";

const PageNav = () => {
  return (
    <nav className={styles.nav}>
      <div>
        <Logo />
      </div>

      <ul>
        <li>
          <NavLink to="/"> Home</NavLink>
        </li>

        <li>
          <NavLink to="/Pricing"> Pricing</NavLink>
        </li>

        <li>
          <NavLink to="/Product"> Product</NavLink>
        </li>

        <li>
          <NavLink to="/log-in" className={styles.ctaLink}>
            {" "}
            Log In
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default PageNav;
