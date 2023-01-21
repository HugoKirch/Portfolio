import jwtDecode from "jwt-decode";
import { useRef } from "react";
import { propsComponent } from "../../config/types";

const TwilioSendSMS: React.FC<propsComponent> = ({
  uuid,
  id,
  savedValue,
  newComponent,
  setArgs,
}) => {
  const token1Ref = useRef(null);
  const token2Ref = useRef(null);
  const fromnbRef = useRef(null);
  const tonbRef = useRef(null);
  const bodyRef = useRef(null);

  const decoded: any = jwtDecode(window.localStorage.getItem("token")!);

  const handleChange = () => {
    setArgs([
      token1Ref.current.value,
      token2Ref.current.value,
      fromnbRef.current.value,
      tonbRef.current.value,
      bodyRef.current.value,
      decoded.uuid,
    ]);
  };

  return (
    <>
      <form id="form">
        <input
          ref={token1Ref}
          type="text"
          placeholder="Account SID"
          defaultValue={savedValue[0] || ""}
          onChange={handleChange}
        />
        <input
          ref={token2Ref}
          type="text"
          placeholder="Auth Token"
          defaultValue={savedValue[1] || ""}
          onChange={handleChange}
        />
        <input
          ref={fromnbRef}
          type="text"
          placeholder="Phone number 'from'"
          defaultValue={savedValue[2] || ""}
          onChange={handleChange}
        />
        <input
          ref={tonbRef}
          type="text"
          placeholder="Phone number 'to'"
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

export default TwilioSendSMS;
