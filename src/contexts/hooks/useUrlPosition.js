import { useSearchParams } from "react-router-dom";

const useUrlPosition = () => {
  const [searchParam] = useSearchParams();
  const mapLat = searchParam.get("lat");
  const mapLng = searchParam.get("lng");
  return [mapLat, mapLng];
};

export default useUrlPosition;
