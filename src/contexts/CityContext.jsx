// import { useEffect, useState } from "react";
// import { createContext } from "react";
// import PropTypes from "prop-types";
// import { useContext } from "react";

// const PostContext = createContext();

// const BASE_URL = "http://localhost:9000";

// function CitiesProvider({ children }) {
//   const [cities, SetCities] = useState([]);
//   const [isLoading, setLoading] = useState(false);
//   console.log(cities);

//   useEffect(() => {
//     async function data() {
//       try {
//         setLoading(true);
//         const res = await fetch(`${BASE_URL}/cities`);
//         const data = await res.json();
//         SetCities(data);
//       } catch {
//         console.log("error is loading");
//       } finally {
//         setLoading(false);
//       }
//     }
//     data();
//   }, []);

//   return (
//     <PostContext.Provider value={{ cities, isLoading }}>
//       console.log(cities)
//       {children}
//     </PostContext.Provider>
//   );
// }

// CitiesProvider.propTypes = {
//   children: PropTypes.any.isRequired,
// };

// //custom hook
// function useCities() {
//   const value = useContext();
//   if (value === undefined)
//     throw new Error(
//       "out of context make sure your accessing the context API in the right place "
//     );
//   return value;
// }

// export { CitiesProvider, useCities };
