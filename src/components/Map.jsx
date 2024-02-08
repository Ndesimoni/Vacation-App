import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

const Map = () => {
  const navigate = useNavigate();

  const [searchParam, setSearchParam] = useSearchParams();
  const lat = searchParam.get("lat");
  const lng = searchParam.get("lng");

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <p>Map</p>
      <p>lat{lat}</p>
      <p>lng{lng}</p>
      <button onClick={() => setSearchParam({ lat: 50, lng: 80 })}>
        see location
      </button>
    </div>
  );
};

export default Map;
