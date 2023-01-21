import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { propsComponent } from "../../config/types";

const GitlabEverything: React.FC<propsComponent> = ({
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

  if (newComponent) {
    return (
      <>
        <h1>No information needed</h1>
      </>
    );
  }
  else {
    return (
      <>
        <h1>Token: {savedValue[0]}</h1>
      </>
    );
  }
};

export default GitlabEverything;
