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

const WeatherstackTemperature: React.FC<propsComponent> = ({
  uuid,
  id,
  savedValue,
  newComponent,
  setArgs,
}) => {
  const [location, setLocation] = useState("");
  const [minTemp, setMinTemp] = useState("");
  const [maxTemp, setMaxTemp] = useState("");

  return (
    <>
      <TextInput
        placeholder="City"
        defaultValue={savedValue[0] || ""}
        onChangeText={async (e) => {
          setLocation(e);
          const decoded: any = jwtDecode(await getValue("token"));
          setArgs([e, minTemp, maxTemp, decoded.uuid]);
        }}
        style={styles.inputTmp}
      />
      <TextInput
        placeholder="Coldest temperature"
        defaultValue={savedValue[1] || ""}
        onChangeText={async (e) => {
          setMinTemp(e);
          const decoded: any = jwtDecode(await getValue("token"));
          setArgs([location, e, maxTemp, decoded.uuid]);
        }}
        style={styles.inputTmp}
      />
      <TextInput
        placeholder="Warmest temperature"
        defaultValue={savedValue[2] || ""}
        onChangeText={async (e) => {
          setMaxTemp(e);
          const decoded: any = jwtDecode(await getValue("token"));
          setArgs([location, minTemp, e, decoded.uuid]);
        }}
        style={styles.inputTmp}
      />
    </>
  );
};

export default WeatherstackTemperature;
