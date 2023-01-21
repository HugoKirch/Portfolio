import { Dispatch, SetStateAction } from "react";

export type propsComponent = {
  uuid: string;
  id: number;
  savedValue: string[];
  newComponent: boolean;
  setArgs?: Dispatch<SetStateAction<string[]>>;
};
