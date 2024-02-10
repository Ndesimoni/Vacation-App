import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Map.module.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useCities } from "../contexts/CityContext";
import PropTypes from "prop-types";

const Map = () => {
  // const navigate = useNavigate();
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);

  const [searchParam] = useSearchParams();
  const mapLat = searchParam.get("lat");
  const mapLng = searchParam.get("lng");

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={5}
        scrollWheelZoom={false}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
      </MapContainer>
    </div>
  );
};

// function we created to control the  map for better user experience
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

ChangeCenter.propTypes = {
  position: PropTypes.any.isRequired,
};

export default Map;
