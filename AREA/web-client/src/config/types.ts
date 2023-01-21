import { Dispatch, SetStateAction } from "react";

export type SignInUser = {
    email: string,
    password: string
};

export type SignUpUser = {
    username: string,
    email: string,
    password: string
};

export type propsComponent = {
  uuid: string;
  id: number;
  savedValue: string[];
  newComponent: boolean;
  setArgs?: Dispatch<SetStateAction<string[]>>;
};

