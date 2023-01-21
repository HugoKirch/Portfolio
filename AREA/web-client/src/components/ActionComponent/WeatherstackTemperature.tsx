import jwtDecode from "jwt-decode";
import { useRef } from "react";
import { propsComponent } from "../../config/types";

const WeatherstackTemperature: React.FC<propsComponent> = ({
  uuid,
  id,
  savedValue,
  newComponent,
  setArgs,
}) => {
  const locationRef = useRef(null);
  const minTempRef = useRef(null);
  const maxTempRef = useRef(null);

  const decoded: any = jwtDecode(window.localStorage.getItem("token")!);

  const handleChange = () => {
    setArgs([
      locationRef.current.value,
      minTempRef.current.value,
      maxTempRef.current.value,
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
          ref={minTempRef}
          type="text"
          name="class"
          placeholder="Coldest temperature"
          defaultValue={savedValue[1] || ""}
          onChange={handleChange}
        />
        <input
          ref={maxTempRef}
          type="text"
          name="class"
          placeholder="Warmest temperature"
          defaultValue={savedValue[2] || ""}
          onChange={handleChange}
        />
      </form>
    </>
  );
};

export default WeatherstackTemperature;
