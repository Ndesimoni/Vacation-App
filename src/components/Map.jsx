import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useCities } from "../contexts/CityContext";
import PropTypes from "prop-types";
import { useGeolocation } from "../contexts/hooks/useGeolocation";
import Button from "../components/Button";
import useUrlPosition from "../contexts/hooks/useUrlPosition";

const Map = () => {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const [mapLat, mapLng] = useUrlPosition();

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geolocationPosition)
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading ..." : "put your position on the map "}
        </Button>
      )}

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
          <Marker position={[40, 0]} key={city.id}>
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};

// const Map = () => {
//   const { cities } = useCities();

//   const [mapPosition, setMapPosition] = useState([40, 0]);
//   const {
//     isLoading: isLoadingPosition,
//     position: geolocationPosition,
//     getPosition,
//   } = useGeolocation();

//   const [mapLat, mapLng] = useUrlPosition();

//   useEffect(() => {
//     if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
//   }, [mapLat, mapLng]);

//   useEffect(() => {
//     if (geolocationPosition)
//       setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
//   }, [geolocationPosition]);

//   return (
//     <div className={styles.mapContainer}>
//

// function we created to control the  map for better user experience
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

ChangeCenter.propTypes = {
  position: PropTypes.any.isRequired,
};

export default Map;

/////////////////////////////////////////////////////
