import styles from "../../config/style";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import { useRef } from "react";
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
  TextInputTextInputEventData,
} from "react-native";
import { propsComponent } from "../../config/types";
import { getValue } from "../../services/Storage/LocalStorage";

const Mediastack: React.FC<propsComponent> = ({
  uuid,
  id,
  savedValue,
  newComponent,
  setArgs,
}) => {
  const [countries, setCountries] = useState("");
  const [sports, setSports] = useState("");

  return (
    <>
      <TextInput
        placeholder="Reference country"
        defaultValue={savedValue[0] || ""}
        onChangeText={async (e) => {
          setCountries(e);
          const decoded: any = jwtDecode(await getValue("token"));
          setArgs([e, sports, decoded.uuid]);
        }}
        style={styles.inputTmp}
      />
      <TextInput
        placeholder="Sport news"
        defaultValue={savedValue[1] || ""}
        onChangeText={async (e) => {
          setSports(e);
          const decoded: any = jwtDecode(await getValue("token"));
          setArgs([countries, e, decoded.uuid]);
        }}
        style={styles.inputTmp}
      />
    </>
  );
};

export default Mediastack;
