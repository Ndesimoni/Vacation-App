import { useContext } from "react";
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const BASE_URL = "http://localhost:9000";
const PostContext = createContext();

const CityContext = ({ children }) => {
  const [cities, SetCities] = useState([]);
  const [isLoading, setLoading] = useState(false);

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

  return (
    <PostContext.Provider value={{ cities, isLoading }}>
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
