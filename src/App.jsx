import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";

import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CityContext } from "./contexts/CityContext";

// const BASE_URL = "http://localhost:9000";

const App = () => {
  // const [cities, SetCities] = useState([]);
  // const [isLoading, setLoading] = useState(false);

  // useEffect(() => {
  //   async function dataFetch() {
  //     try {
  //       setLoading(true);
  //       const res = await fetch(`${BASE_URL}/cities`);
  //       const data = await res.json();
  //       SetCities(data);
  //     } catch {
  //       console.log("error is loading");
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   dataFetch();
  // }, []);

  return (
    <div>
      <CityContext>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/product" element={<Product />} />
            <Route path="/log-in" element={<Login />} />
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />

              <Route path="cities/:id" element={<City />} />

              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CityContext>
    </div>
  );
};

export default App;
