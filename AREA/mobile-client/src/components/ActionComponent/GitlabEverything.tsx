import jwtDecode from "jwt-decode";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import styles from "../../config/style";
import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputChangeEventData,
  TextInputTextInputEventData,
} from "react-native";
import { propsComponent } from "../../config/types";
import { getValue } from "../../services/Storage/LocalStorage";

const GitlabEverything: React.FC<propsComponent> = ({
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

  if (newComponent) {
    return (
      <>
        <Text>No information needed</Text>
      </>
    );
  }
  else {
    return (
      <>
        <Text>Token: {savedValue[0]}</Text>
      </>
    );
  }
};

export default GitlabEverything;
