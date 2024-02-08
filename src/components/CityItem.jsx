import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import PropTypes from "prop-types";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

const CityItem = ({ city }) => {
  console.log(city);
  const { cityName, emoji, date, id, position } = city;
  const lat = position.lat;
  const lng = position.lng;

  return (
    <li>
      <Link to={`${id}?lat=${lat}&lng=${lng}`} className={styles.cityItem}>
        <span className={styles.emoji}> {emoji}</span>
        <h3 className={styles.name}>{cityName} </h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn}> &times;</button>
      </Link>
    </li>
  );
};

CityItem.propTypes = {
  city: PropTypes.object.isRequired,
};

export default CityItem;
