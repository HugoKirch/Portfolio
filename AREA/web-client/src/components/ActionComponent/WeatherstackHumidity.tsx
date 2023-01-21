import jwtDecode from "jwt-decode";
import { useRef } from "react";
import { propsComponent } from "../../config/types";

const WeatherstackHumidity: React.FC<propsComponent> = ({
  uuid,
  id,
  savedValue,
  newComponent,
  setArgs,
}) => {
  const locationRef = useRef(null);
  const executionActionTimerRef = useRef(null);

  const decoded: any = jwtDecode(window.localStorage.getItem("token")!);

  const handleChange = () => {
    setArgs([
      locationRef.current.value,
      executionActionTimerRef.current.value,
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
          ref={executionActionTimerRef}
          type="text"
          name="class"
          placeholder="Execution time"
          defaultValue={savedValue[1] || ""}
          onChange={handleChange}
        />
      </form>
    </>
  );
};

export default WeatherstackHumidity;
