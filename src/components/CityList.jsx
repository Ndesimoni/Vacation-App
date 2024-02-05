import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Spinner from "./Spinner";

import PropTypes from "prop-types";
import Message from "./Message";

const CityList = ({ cities, isLoading }) => {
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message="add your first city by clicking on the map" />;
  return (
    <ul className={styles.cityList}>
      {" "}
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

// CityList.propTypes = {
//   cities: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       ityName: PropTypes.string.isRequired,
//       country: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   isLoading: PropTypes.bool.isRequired,
// };

export default CityList;
