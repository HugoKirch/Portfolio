import jwtDecode from "jwt-decode";
import { useRef } from "react";
import { propsComponent } from "../../config/types";

const Mediastack: React.FC<propsComponent> = ({
  uuid,
  id,
  savedValue,
  newComponent,
  setArgs,
}) => {
  const countriesRef = useRef(null);
  const sportsRef = useRef(null);

  const decoded: any = jwtDecode(window.localStorage.getItem("token")!);

  const handleChange = () => {
    setArgs([
      countriesRef.current.value,
      sportsRef.current.value,
      decoded.uuid,
    ]);
  };

  return (
    <>
      <form id="form">
        <input
          ref={countriesRef}
          type="text"
          name="class"
          placeholder="Reference Country"
          defaultValue={savedValue[0] || ""}
          onChange={handleChange}
        />
        <input
          ref={sportsRef}
          type="text"
          name="class"
          placeholder="Sport news"
          defaultValue={savedValue[1] || ""}
          onChange={handleChange}
        />
      </form>
    </>
  );
};

export default Mediastack;
