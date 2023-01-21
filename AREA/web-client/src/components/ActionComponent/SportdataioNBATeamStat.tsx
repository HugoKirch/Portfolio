import jwtDecode from "jwt-decode";
import { useRef } from "react";
import { propsComponent } from "../../config/types";

const SportdataioNBATeamStat: React.FC<propsComponent> = ({
  uuid,
  id,
  savedValue,
  newComponent,
  setArgs,
}) => {
  const teamNameRef = useRef(null);

  const decoded: any = jwtDecode(window.localStorage.getItem("token")!);

  const handleChange = () => {
    setArgs([teamNameRef.current.value, decoded.uuid]);
  };

  return (
    <>
      <form id="form">
        <input
          ref={teamNameRef}
          type="text"
          name="class"
          placeholder="Team name"
          defaultValue={savedValue[0] || ""}
          onChange={handleChange}
        />
      </form>
    </>
  );
};

export default SportdataioNBATeamStat;
