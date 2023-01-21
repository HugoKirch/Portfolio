import { CommonActions, useNavigation } from "@react-navigation/native";
import axios from "axios";

export const getModules = (credentials: {token:string }) => {
  return axios
  .post("https://area.shurisko.fr/reactions/list", credentials)
  .then((response) => {
      return response.data.list;
  })
}

export const createModule = (info: 
  { token:string, 
    data: {
      _actionUUID: string, 
      _actionID: number,
      _actionSavedValue: string[], 
      _reactionUUID:string, 
      _reactionID:number, 
      _reactionSavedValue:string[]
  }}) => {
  return axios
  .post("https://area.shurisko.fr/reactions/add", info)
  .then(() => {
    alert("Module created !")
    return true;
  })
  .catch((response) => {
    alert("Impossible to create module !")
    console.log(response)
  })
}

export const deleteModule = (info: 
  { token:string, 
    data: {
      _actionUUID: string, 
      _actionID: number,
      _actionSavedValue: string[], 
      _reactionUUID:string, 
      _reactionID:number, 
      _reactionSavedValue:string[]
  }}) => {
  return axios
  .delete("https://area.shurisko.fr/reactions/delete", {
    data: info
  })
  .then(() => {
    return true;
  })
  .catch((response) => {
    alert("Impossible to delete module !")
    console.log(response)
  })
}
