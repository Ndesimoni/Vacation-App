// import { useContext, useReducer } from "react";
// import { createContext, useEffect } from "react";
import PropTypes from "prop-types";

// const BASE_URL = "http://localhost:9000";
// const PostContext = createContext();

// const initialState = {
//   cities: [],
//   isLoading: false,
//   currentCity: {},
//   error: "",
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case "loading":
//       return {
//         ...state,
//         isLoading: true,
//       };

//     case "cities/loaded":
//       return {
//         ...state,
//         isLoading: false,
//         cities: action.payload,
//       };

//     case "city/loaded":
//       return {
//         ...state,
//         isLoading: false,
//         currentCity: action.payload,
//       };

//     case "city/created":
//       return {
//         ...state,
//         isLoading: false,
//         cities: [...state.cities, action.payload],
//       };
//     case "city/deleted":
//       return {
//         ...state,
//         isLoading: false,
//         cities: state.cities.filter((city) => city.id !== action.payload),
//       };

//     case "rejectedError":
//       return {
//         ...state,
//         isLoading: false,
//         error: action.payload,
//       };

//     default:
//       throw new Error("unknown action");
//   }
// }

// const CityContext = ({ children }) => {
//   const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
//     reducer,
//     initialState
//   );

//   // const [cities, SetCities] = useState([]);
//   // const [isLoading, setLoading] = useState(false);
//   // const [currentCity, setCurrentCity] = useState({});

//   useEffect(() => {
//     async function dataFetch() {
//       dispatch({ type: "loading" });

//       try {
//         const res = await fetch(`${BASE_URL}/cities`);
//         const data = await res.json();
//         dispatch({ type: "loading", payload: data });
//       } catch {
//         dispatch({
//           type: "rejectedError",
//           payload: "there was and error loading the cities",
//         });
//       }
//     }
//     dataFetch();
//   }, []);

//   async function getCities(id) {
//     dispatch({ type: "loading" });
//     try {
//       const res = await fetch(`${BASE_URL}/cities/${id}`);
//       const data = await res.json();
//       dispatch({ type: "city/loaded", payload: data });
//     } catch {
//       dispatch({
//         type: "rejectedError",
//         payload: "there was and error loading the city",
//       });
//     }
//   }

//   async function createCity(newCity) {
//     dispatch({ type: "loading" });
//     try {
//       const res = await fetch(`${BASE_URL}/cities`, {
//         method: "POST",
//         body: JSON.stringify(newCity),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       const data = await res.json();
//       dispatch({ type: "city/created", payload: data });
//     } catch (err) {
//       dispatch({
//         type: "rejectedError",
//         payload: "there was and error creating the city",
//       });
//     }
//   }

//   async function deleteCity(id) {
//     dispatch({ type: "loading" });
//     try {
//       await fetch(`${BASE_URL}/cities/${id}`, {
//         method: "DELETE",
//       });
//       dispatch({ type: "city/deleted", payload: id });
//     } catch {
//       dispatch({
//         type: "rejectedError",
//         payload: "there was and error deleting the city",
//       });
//     }
//   }

//   return (
//     <PostContext.Provider
//       value={{
//         cities,
//         isLoading,
//         currentCity,
//         getCities,
//         createCity,
//         deleteCity,
//       }}
//     >
//       {children}
//     </PostContext.Provider>
//   );
// };

// // prop type validation here
// CityContext.propTypes = {
//   children: PropTypes.any.isRequired,
// };

// // custom hook for use context
// function useCities() {
//   const value = useContext(PostContext);
//   if (value === undefined)
//     throw new Error(
//       "your trying to use the use context in a component which is out of context "
//     );
//   return value;
// }

// export { CityContext, useCities };

import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react";

const BASE_URL = "http://localhost:9000";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}

function CityContext({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities...",
        });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async (id) => {
      if (Number(id) === currentCity.id) return;

      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading the city...",
        });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating the city...",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });

    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the city...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

CityContext.propTypes = {
  children: PropTypes.any.isRequired,
};

export { CityContext, useCities };
