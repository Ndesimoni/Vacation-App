// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Button from "./Button";
import BackButton from "./BackButton";
import useUrlPosition from "../contexts/hooks/useUrlPosition";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import { useCities } from "../contexts/CityContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [isLoadingGeolocation, setIsLoadingGeolocation] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geoCodingError, setGeoCodingError] = useState("");

  const { mapLat, mapLng } = useUrlPosition();
  const { createCity } = useCities();

  const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client?";

  useEffect(() => {
    if (!mapLat && !mapLng) return;

    async function fetchCityData() {
      try {
        setIsLoadingGeolocation(true);
        setGeoCodingError("");
        const res = await fetch(
          `${BASE_URL}latitude=${mapLat}&longitude=${mapLng}`
        );
        const data = await res.json();

        if (!data.countryCode)
          throw new Error(
            "there doesn't seem to be a city . click somewhere else 😉"
          );
        setCityName(data.cityName || data.locality || "");
        setCountry(data.country || "");
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        setGeoCodingError(error.message);
      } finally {
        setIsLoadingGeolocation(false);
      }
    }
    fetchCityData();
  }, [mapLat, mapLng]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!cityName && !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        mapLat,
        mapLng,
      },
    };
    createCity(newCity);
  }

  if (isLoadingGeolocation) return <Spinner />;

  if (!mapLng && !mapLat)
    return <Message message="there is no city please click on the map" />;

  if (geoCodingError) return <Message message={geoCodingError} />;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat={"dd/MM/yyyy"}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
