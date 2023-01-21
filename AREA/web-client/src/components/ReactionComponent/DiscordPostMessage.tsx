import jwtDecode from "jwt-decode";
import { useRef } from "react";
import { propsComponent } from "../../config/types";

const DiscordPostMessage: React.FC<propsComponent> = ({
  uuid,
  id,
  savedValue,
  newComponent,
  setArgs,
}) => {
  const usernameRef = useRef(null);
  const bodyRef = useRef(null);
  const tokenRef = useRef(null);

  const decoded: any = jwtDecode(window.localStorage.getItem("token")!);

  const handleChange = () => {
    setArgs([
      usernameRef.current.value,
      bodyRef.current.value,
      tokenRef.current.value,
      decoded.uuid,
    ]);
  };

  return (
    <>
      <form id="form">
        <input
          ref={usernameRef}
          type="text"
          placeholder="Username"
          defaultValue={savedValue[0] || ""}
          onChange={handleChange}
        />
        <input
          ref={bodyRef}
          type="text"
          placeholder="Message content"
          defaultValue={savedValue[1] || ""}
          onChange={handleChange}
        />
        <input
          ref={tokenRef}
          type="text"
          placeholder="Bot URL"
          defaultValue={savedValue[2] || ""}
          onChange={handleChange}
        />
      </form>
    </>
  );
};

export default DiscordPostMessage;
