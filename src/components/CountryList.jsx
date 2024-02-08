import PropTypes from "prop-types";
import Spinner from "./Spinner";
import Message from "./Message";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
// import { useCities } from "../contexts/CityContext";

const CountryList = ({ cities, isLoading }) => {
  // const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return <Message message="add your first city by clicking on the map" />;

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((ell) => ell.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
};

CountryList.propTypes = {
  cities: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
export default CountryList;
