import Logo from "./Logo";
import AppNav from "./AppNav";
import styles from "./sidebar.module.css";
import Footer from "./Footer";

const SideBar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <p>List of Cities</p>
      <Footer />
    </div>
  );
};

export default SideBar;
