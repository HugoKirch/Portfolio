import jwtDecode from "jwt-decode";
import { useRef } from "react";
import { propsComponent } from "../../config/types";
import "./style.css";

const AviationstackCancelledFlight: React.FC<propsComponent> = ({
  uuid,
  id,
  savedValue,
  newComponent,
  setArgs,
}) => {
  const flightNumberRef = useRef(null);
  const flightDateRef = useRef(null);

  const decoded: any = jwtDecode(window.localStorage.getItem("token")!);

  const handleChange = () => {
    setArgs([
      flightNumberRef.current.value,
      flightDateRef.current.value,
      decoded.uuid,
    ]);
  };

  return (
    <>
      <form id="form">
        <input
          ref={flightNumberRef}
          type="text"
          name="class"
          placeholder="Flight Number"
          defaultValue={savedValue[0] || ""}
          onChange={handleChange}
        />
        <input
          ref={flightDateRef}
          type="text"
          name="class"
          placeholder="Flight Date"
          defaultValue={savedValue[1] || ""}
          onChange={handleChange}
        />
      </form>
    </>
  );
};

export default AviationstackCancelledFlight;
