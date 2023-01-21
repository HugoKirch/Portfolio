import jwtDecode from "jwt-decode";
import { useRef } from "react";
import { propsComponent } from "../../config/types";

const DiscordMessageDetection: React.FC<propsComponent> = ({
  uuid,
  id,
  savedValue,
  newComponent,
  setArgs,
}) => {
  const tokenRef = useRef(null);
  const triggerWordRef = useRef(null);

  const decoded: any = jwtDecode(window.localStorage.getItem("token")!);

  const handleChange = () => {
    setArgs([
      tokenRef.current.value,
      triggerWordRef.current.value,
      decoded.uuid,
    ]);
  };

  return (
    <>
      <form id="form">
        <input
          ref={tokenRef}
          type="text"
          name="class"
          placeholder="Bot URL"
          defaultValue={savedValue[0] || ""}
          onChange={handleChange}
        />
        <input
          ref={triggerWordRef}
          type="text"
          name="class"
          placeholder="Word to trigger"
          defaultValue={savedValue[1] || ""}
          onChange={handleChange}
        />
      </form>
    </>
  );
};

export default DiscordMessageDetection;
