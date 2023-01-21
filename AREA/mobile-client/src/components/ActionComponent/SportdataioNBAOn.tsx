import styles from "../../config/style";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputChangeEventData,
  TextInputTextInputEventData,
} from "react-native";
import { propsComponent } from "../../config/types";
import { getValue } from "../../services/Storage/LocalStorage";

const SportdataioNBAOn: React.FC<propsComponent> = ({
  uuid,
  id,
  savedValue,
  newComponent,
  setArgs,
}) => {
  useEffect(() => {
    (async () => {
      const userToken = await getValue("token");
      const decoded: any = jwtDecode(userToken);
      setArgs([decoded.uuid]);
    })();
  }, [setArgs]);

  return (
    <>
      <Text>No information needed</Text>
    </>
  );
};

export default SportdataioNBAOn;
