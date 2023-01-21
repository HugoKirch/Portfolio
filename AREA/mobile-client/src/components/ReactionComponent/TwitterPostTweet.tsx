import jwtDecode from "jwt-decode";
import { useState } from "react";
import { TextInput } from "react-native";
import { propsComponent } from "../../config/types";
import { getValue } from "../../services/Storage/LocalStorage";

const TwitterPostTweet: React.FC<propsComponent> = ({
  uuid,
  id,
  savedValue,
  newComponent,
  setArgs,
}) => {
  const [appKey, setAppKey] = useState("");
  const [appSecret, setAppSecret] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [accessSecret, setAccessSecret] = useState("");
  const [body, setBody] = useState("");

  const handleChange = async () => {
    const token = await getValue("token");
    const decoded: any = jwtDecode(token);
    setArgs([appKey, appSecret, accessToken, accessSecret, body, decoded.uuid]);
  };

  return (
    <>
      <TextInput
        placeholder="App Key"
        defaultValue={savedValue[0] || ""}
        onChangeText={async (e) => {
          setAppKey(e);
          const decoded: any = jwtDecode(await getValue("token"));
          setArgs([
            e,
            appSecret,
            accessToken,
            accessSecret,
            body,
            decoded.uuid,
          ]);
        }}
      />
      <TextInput
        placeholder="App Secret"
        defaultValue={savedValue[1] || ""}
        onChangeText={async (e) => {
          setAppSecret(e);
          const decoded: any = jwtDecode(await getValue("token"));
          setArgs([appKey, e, accessToken, accessSecret, body, decoded.uuid]);
        }}
      />
      <TextInput
        placeholder="Access Token"
        defaultValue={savedValue[2] || ""}
        onChangeText={async (e) => {
          setAccessToken(e);
          const decoded: any = jwtDecode(await getValue("token"));
          setArgs([appKey, appSecret, e, accessSecret, body, decoded.uuid]);
        }}
      />
      <TextInput
        placeholder="Access Secret"
        defaultValue={savedValue[3] || ""}
        onChangeText={async (e) => {
          setAccessSecret(e);
          const decoded: any = jwtDecode(await getValue("token"));
          setArgs([appKey, appSecret, accessToken, e, body, decoded.uuid]);
        }}
      />
      <TextInput
        placeholder="Body"
        defaultValue={savedValue[4] || ""}
        onChangeText={async (e) => {
          setBody(e);
          const decoded: any = jwtDecode(await getValue("token"));
          setArgs([
            appKey,
            appSecret,
            accessToken,
            accessSecret,
            e,
            decoded.uuid,
          ]);
        }}
      />
    </>
  );
};

export default TwitterPostTweet;
