import jwtDecode from "jwt-decode";
import { useRef } from "react";
import { propsComponent } from "../../config/types";

const TwitterPostTweet: React.FC<propsComponent> = ({
  uuid,
  id,
  savedValue,
  newComponent,
  setArgs,
}) => {
  const appKeyRef = useRef(null);
  const appSecretRef = useRef(null);
  const accessTokenRef = useRef(null);
  const accessSecretRef = useRef(null);
  const bodyRef = useRef(null);

  const decoded: any = jwtDecode(window.localStorage.getItem("token")!);

  const handleChange = () => {
    setArgs([
      appKeyRef.current.value,
      appSecretRef.current.value,
      accessTokenRef.current.value,
      accessSecretRef.current.value,
      bodyRef.current.value,
      decoded.uuid,
    ]);
  };

  return (
    <>
      <form id="form">
        <input
          ref={appKeyRef}
          type="text"
          placeholder="App Key"
          defaultValue={savedValue[0] || ""}
          onChange={handleChange}
        />
        <input
          ref={appSecretRef}
          type="text"
          placeholder="App Secret"
          defaultValue={savedValue[1] || ""}
          onChange={handleChange}
        />
        <input
          ref={accessTokenRef}
          type="text"
          placeholder="Access Token"
          defaultValue={savedValue[2] || ""}
          onChange={handleChange}
        />
        <input
          ref={accessSecretRef}
          type="text"
          placeholder="Access Secret"
          defaultValue={savedValue[3] || ""}
          onChange={handleChange}
        />
        <input
          ref={bodyRef}
          type="text"
          placeholder="Message content"
          defaultValue={savedValue[4] || ""}
          onChange={handleChange}
        />
      </form>
    </>
  );
};

export default TwitterPostTweet;
