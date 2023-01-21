import React, { Dispatch, FC, SetStateAction } from "react";
import { View } from "react-native";
import { areaList } from "../../config/components";

type props = {
  uuid: string;
  id: number;
  savedValue: string[];
  newComponent: boolean;
  setArgs?: Dispatch<SetStateAction<string[]>>;
};

const Reactionhandler: FC<props> = ({
  uuid,
  id,
  savedValue,
  newComponent,
  setArgs,
}) => {
  const component = React.createElement(areaList[id - 1]!.component, {
    uuid: uuid,
    id: id,
    savedValue: savedValue,
    newComponent: newComponent,
    setArgs: setArgs,
  });

  return <View>{component}</View>;
};

export default Reactionhandler;
