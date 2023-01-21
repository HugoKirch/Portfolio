import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { propsComponent } from "../../config/types";

const SportdataioNBAOn: React.FC<propsComponent> = ({
  uuid,
  id,
  savedValue,
  newComponent,
  setArgs,
}) => {
  const decoded: any = jwtDecode(window.localStorage.getItem("token")!);

  useEffect(() => {
    setArgs([decoded.uuid]);
  }, [decoded.uuid, setArgs]);

  return (
    <>
      <h1>No information needed</h1>
    </>
  );
};

export default SportdataioNBAOn;
