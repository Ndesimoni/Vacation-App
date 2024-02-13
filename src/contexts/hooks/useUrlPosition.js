import { useSearchParams } from "react-router-dom";

const useUrlPosition = () => {
  const [searchParam] = useSearchParams();
  const lat = searchParam.get("lat");
  const lng = searchParam.get("lng");
  return [lat, lng];
};

export default useUrlPosition;
