import jwtDecode from "jwt-decode";
import { useState } from "react";
import { useRef } from "react";
import styles from "../../config/style";
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
  TextInputTextInputEventData,
} from "react-native";
import { propsComponent } from "../../config/types";
import { getValue } from "../../services/Storage/LocalStorage";

const AviationstackDelayArrival: React.FC<propsComponent> = ({
  uuid,
  id,
  savedValue,
  newComponent,
  setArgs,
}) => {
  const [flightNumber, setFlightNumber] = useState("");
  const [flightDate, setFlightDate] = useState("");
  const [flightAirport, setFlightAirport] = useState("");

  return (
    <>
      <TextInput
        placeholder="Flight number"
        defaultValue={savedValue[0] || ""}
        onChangeText={async (e) => {
          setFlightNumber(e);
          const decoded: any = jwtDecode(await getValue("token"));
          setArgs([e, flightDate, flightAirport, decoded.uuid]);
        }}
        style={styles.inputTmp}
      />
      <TextInput
        placeholder="Flight date"
        defaultValue={savedValue[1] || ""}
        onChangeText={async (e) => {
          setFlightDate(e);
          const decoded: any = jwtDecode(await getValue("token"));
          setArgs([flightNumber, e, flightAirport, decoded.uuid]);
        }}
        style={styles.inputTmp}
      />
      <TextInput
        placeholder="Flight airport"
        defaultValue={savedValue[2] || ""}
        onChangeText={async (e) => {
          setFlightAirport(e);
          const decoded: any = jwtDecode(await getValue("token"));
          setArgs([flightNumber, flightDate, e, decoded.uuid]);
        }}
        style={styles.inputTmp}
      />
    </>
  );
};

export default AviationstackDelayArrival;
