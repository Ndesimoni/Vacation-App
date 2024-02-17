import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import PropTypes from "prop-types";
import { useCities } from "../contexts/CityContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

const CityItem = ({ city }) => {
  const { currentCity, deleteCity } = useCities();

  const { cityName, emoji, date, id, position } = city;
  const lat = position.lat;
  const lng = position.lng;

  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
    // console.log("click");
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${lat}&lng=${lng}`}
      >
        <span className={styles.emoji}> {emoji}</span>
        <h3 className={styles.name}>{cityName} </h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          {" "}
          &times;
        </button>
      </Link>
    </li>
  );
};

CityItem.propTypes = {
  city: PropTypes.object.isRequired,
};

export default CityItem;
