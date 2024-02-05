import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>
        &copy; Copyright {new Date().getFullYear}WorldWise Inc.
      </div>
    </footer>
  );
};

export default Footer;
