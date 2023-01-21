import jwtDecode from "jwt-decode";
import { useRef } from "react";
import { TextInput } from "react-native";
import { propsComponent } from "../../config/types";

const TESTACTION: React.FC<propsComponent> = ({
  uuid,
  id,
  savedValue,
  newComponent,
  setArgs,
}) => {
  const flightNumberRef = useRef(null);
  const flightDateRef = useRef(null);

  const handleChange = () => {};

  return (
    <>
      <TextInput
        ref={flightNumberRef}
        placeholder="Flight Number"
        defaultValue={savedValue[0] || ""}
        onChangeText={handleChange}
      />
      <TextInput
        ref={flightDateRef}
        placeholder="Flight Date"
        defaultValue={savedValue[1] || ""}
        onChange={handleChange}
      />
    </>
  );
};

export default TESTACTION;
