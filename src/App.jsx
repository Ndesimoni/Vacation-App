import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";

const BASE_URL = "http://localhost:9000";
const App = () => {
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
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/product" element={<Product />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/app" element={<AppLayout />}>
            <Route
              index
              element={<CityList cities={cities} isLoading={isLoading} />}
            />
            <Route
              path="cities"
              element={<CityList cities={cities} isLoading={isLoading} />}
            />
            <Route
              path="countries"
              element={<CountryList cities={cities} isLoading={isLoading} />}
            />
            <Route path="form" element={<p>Form</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
