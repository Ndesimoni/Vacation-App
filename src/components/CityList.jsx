import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Spinner from "./Spinner";

import PropTypes from "prop-types";
import Message from "./Message";
// import { useCities } from "../contexts/CityContext";

const CityList = ({ cities, isLoading }) => {
  // const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return <Message message="add your first city by clicking on the map" />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
};

CityList.propTypes = {
  cities: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default CityList;
