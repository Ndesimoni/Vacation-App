import { useContext } from "react";
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const BASE_URL = "http://localhost:9000";
const PostContext = createContext();

const CityContext = ({ children }) => {
  const [cities, SetCities] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function dataFetch() {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        SetCities(data);
      } catch {
        console.log("error is loading");
      } finally {
        setLoading(false);
      }
    }
    dataFetch();
  }, []);

  async function getCities(id) {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      console.log("error is loading");
    } finally {
      setLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        // method: " POST",
        // body: JSON.stringify(newCity),
        // headers: { "Content-Type": "application/json" },

        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setCurrentCity(...cities, data);
      // console.log(data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PostContext.Provider
      value={{ cities, isLoading, currentCity, getCities, createCity }}
    >
      {children}
    </PostContext.Provider>
  );
};

// prop type validation here
CityContext.propTypes = {
  children: PropTypes.any.isRequired,
};

// custom hook for use context
const useCities = () => {
  const value = useContext(PostContext);
  if (value === undefined)
    throw new Error(
      "your trying to use the use context in a component which is out of context "
    );
  return value;
};

export { CityContext, useCities };
