import axios from "axios";
import { toast } from "react-hot-toast";

export const getModules = (credentials: { token: string }) => {
  return axios
    .post("http://localhost:8080/reactions/list", credentials)
    .then((response) => {
      return response.data.list;
    });
};

export const createModule = (info: {
  token: string;
  data: {
    _actionUUID: string;
    _actionID: number;
    _actionSavedValue: string[];
    _reactionUUID: string;
    _reactionID: number;
    _reactionSavedValue: string[];
  };
}) => {
  return axios
    .post("http://localhost:8080/reactions/add", info)
    .then(() => {
      toast.success("Module created !");
      window.location.reload();
      return true;
    })
    .catch((response) => {
      toast.error("Impossbible to create module !");
      console.log(response);
    });
};

export const deleteModule = (info: {
  token: string;
  data: {
    _actionUUID: string;
    _actionID: number;
    _actionSavedValue: string[];
    _reactionUUID: string;
    _reactionID: number;
    _reactionSavedValue: string[];
  };
}) => {
  return axios
    .delete("http://localhost:8080/reactions/delete", {data: info})
    .then(() => {
      window.location.reload();
      toast.success("Module deleted !");
      return true;
    })
    .catch((response) => {
      toast.error("Impossible to delete module !");
      console.log(response);
    });
};
