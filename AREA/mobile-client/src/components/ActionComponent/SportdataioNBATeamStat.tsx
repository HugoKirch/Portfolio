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

const SportdataioNBATeamStat: React.FC<propsComponent> = ({
  uuid,
  id,
  savedValue,
  newComponent,
  setArgs,
}) => {
  const [teamName, setTeamName] = useState("");

  return (
    <>
      <TextInput
        placeholder="Team name"
        defaultValue={savedValue[0] || ""}
        onChangeText={async (e) => {
          setTeamName(e);
          const decoded: any = jwtDecode(await getValue("token"));
          setArgs([e, decoded.uuid]);
        }}
        style={styles.inputTmp}
      />
    </>
  );
};

export default SportdataioNBATeamStat;
