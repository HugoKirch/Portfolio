import jwtDecode from "jwt-decode";
import { useRef } from "react";
import { propsComponent } from "../../config/types";

const WeatherstackWindspeed: React.FC<propsComponent> = ({
  uuid,
  id,
  savedValue,
  newComponent,
  setArgs,
}) => {
  const locationRef = useRef(null);
  const windspeedRef = useRef(null);

  const decoded: any = jwtDecode(window.localStorage.getItem("token")!);

  const handleChange = () => {
    setArgs([
      locationRef.current.value,
      windspeedRef.current.value,
      decoded.uuid,
    ]);
  };

  return (
    <>
      <form id="form">
        <input
          ref={locationRef}
          type="text"
          name="class"
          placeholder="City"
          defaultValue={savedValue[0] || ""}
          onChange={handleChange}
        />
        <input
          ref={windspeedRef}
          type="text"
          name="class"
          placeholder="Maximal wind speed"
          defaultValue={savedValue[1] || ""}
          onChange={handleChange}
        />
      </form>
    </>
  );
};

export default WeatherstackWindspeed;
