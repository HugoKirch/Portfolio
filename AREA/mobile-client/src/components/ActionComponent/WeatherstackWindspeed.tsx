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

const WeatherstackWindspeed: React.FC<propsComponent> = ({
  uuid,
  id,
  savedValue,
  newComponent,
  setArgs,
}) => {
  const [location, setLocation] = useState("");
  const [windspeed, setWindspeed] = useState("");

  return (
    <>
      <TextInput
        placeholder="City"
        defaultValue={savedValue[0] || ""}
        onChangeText={async (e) => {
          setLocation(e);
          const decoded: any = jwtDecode(await getValue("token"));
          setArgs([e, windspeed, decoded.uuid]);
        }}
        style={styles.inputTmp}
      />
      <TextInput
        placeholder="Maximal wind speed"
        defaultValue={savedValue[1] || ""}
        onChangeText={async (e) => {
          setWindspeed(e);
          const decoded: any = jwtDecode(await getValue("token"));
          setArgs([location, e, decoded.uuid]);
        }}
        style={styles.inputTmp}
      />
    </>
  );
};

export default WeatherstackWindspeed;
