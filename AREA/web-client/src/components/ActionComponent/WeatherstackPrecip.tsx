import jwtDecode from "jwt-decode";
import { useRef } from "react";
import { propsComponent } from "../../config/types";

const WeatherstackPrecip: React.FC<propsComponent> = ({
  uuid,
  id,
  savedValue,
  newComponent,
  setArgs,
}) => {
  const locationRef = useRef(null);

  const decoded: any = jwtDecode(window.localStorage.getItem("token")!);

  const handleChange = () => {
    setArgs([locationRef.current.value, decoded.uuid]);
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
      </form>
    </>
  );
};

export default WeatherstackPrecip;
