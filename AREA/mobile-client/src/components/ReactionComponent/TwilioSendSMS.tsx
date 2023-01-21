import jwtDecode from "jwt-decode";
import { useState } from "react";
import { useRef } from "react";
import { TextInput } from "react-native";
import { propsComponent } from "../../config/types";
import { getValue } from "../../services/Storage/LocalStorage";

const TwilioSendSMS: React.FC<propsComponent> = ({
  uuid,
  id,
  savedValue,
  newComponent,
  setArgs,
}) => {
  const [token1, setToken1] = useState("");
  const [token2, setToken2] = useState("");
  const [fromnb, setFromnb] = useState("");
  const [tonb, setTonb] = useState("");
  const [body, setBody] = useState("");

  return (
    <>
      <TextInput
        placeholder="Account SID"
        defaultValue={savedValue[0] || ""}
        onChangeText={async (e) => {
          setToken1(e);
          const decoded: any = jwtDecode(await getValue("token"));
          setArgs([e, token2, fromnb, tonb, body, decoded.uuid]);
        }}
      />
      <TextInput
        placeholder="Auth Token"
        defaultValue={savedValue[1] || ""}
        onChangeText={async (e) => {
          setToken2(e);
          const decoded: any = jwtDecode(await getValue("token"));
          setArgs([token1, e, fromnb, tonb, body, decoded.uuid]);
        }}
      />
      <TextInput
        placeholder="Phone number 'from'"
        defaultValue={savedValue[2] || ""}
        onChangeText={async (e) => {
          setFromnb(e);
          const decoded: any = jwtDecode(await getValue("token"));
          setArgs([token1, token2, e, tonb, body, decoded.uuid]);
        }}
      />
      <TextInput
        placeholder="Phone number 'to'"
        defaultValue={savedValue[3] || ""}
        onChangeText={async (e) => {
          setTonb(e);
          const decoded: any = jwtDecode(await getValue("token"));
          setArgs([token1, token2, fromnb, e, body, decoded.uuid]);
        }}
      />
      <TextInput
        placeholder="Message content"
        defaultValue={savedValue[4] || ""}
        onChangeText={async (e) => {
          setBody(e);
          const decoded: any = jwtDecode(await getValue("token"));
          setArgs([token1, token2, fromnb, tonb, e, decoded.uuid]);
        }}
      />
    </>
  );
};

export default TwilioSendSMS;
