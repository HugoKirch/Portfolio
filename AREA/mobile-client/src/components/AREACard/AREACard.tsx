import { Picker } from "@react-native-picker/picker";
import { CommonActions, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { areaList } from "../../config/components";
import { createModule, deleteModule } from "../../services/Modules/ModulesApi";
import { getValue } from "../../services/Storage/LocalStorage";
import Actionhandler from "../ActionHandler/ActionHandler";
import Reactionhandler from "../ReactionHandler/ReactionHandler";

type Modules = {
  _actionUUID: string;
  _actionID: number;
  _actionSavedValue: string[];
  _reactionUUID: string;
  _reactionID: number;
  _reactionSavedValue: string[];
};

type Nav = {
  navigate: (value: string) => void;
  dispatch: (value: any) => void;
};

const AREACard: React.FC<{ module?: Modules }> = ({ module }) => {
  const [actionArgs, setActionArgs] = useState<string[]>([]);
  const [reactionArgs, setReactionArgs] = useState<string[]>([]);

  const [currentAction, setCurrentAction] = useState<number>(1);
  const [currentReaction, setCurrentReaction] = useState<number>(1);

  const navigation = useNavigation<Nav>();

  useEffect(() => {
    if (module) {
      setActionArgs(module._actionSavedValue);
      setReactionArgs(module._reactionSavedValue);
    }
  }, [module]);

  const handleDelete = async () => {
    const token = (await getValue("token")) || "invalid_token";
    const res = await deleteModule({
      token: token,
      data: {
        _actionUUID: module!._actionUUID,
        _actionID: module!._actionID,
        _actionSavedValue: actionArgs,
        _reactionUUID: module!._reactionUUID,
        _reactionID: module!._reactionID,
        _reactionSavedValue: reactionArgs,
      },
    });
    if (res) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Home" }],
        })
      );
      alert("Module deleted !");
    }
  };

  const handleCreate = async () => {
    const token = (await getValue("token")) || "invalid_token";
    console.log("e", token);
    await createModule({
      token: token,
      data: {
        _actionUUID: "-1",
        _actionID: currentAction,
        _actionSavedValue: actionArgs,
        _reactionUUID: "-1",
        _reactionID: currentReaction,
        _reactionSavedValue: reactionArgs,
      },
    });
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Home" }],
      })
    );
  };

  return (
    <View style={styles.container}>
      <View>
        {!module && (
          <>
            <Text style={styles.newTitle}>NEW ACTION</Text>
            <Picker
              onValueChange={(itemValue, itemIndex) => {
                setCurrentAction(itemIndex);
              }}
              selectedValue={areaList[currentAction - 1].name}
            >
              <Picker.Item label="Select Action " value="-1" color="#bdb9b9" />
              {areaList &&
                areaList.map(
                  (action: any) =>
                    action.id <= 16 && (
                      <Picker.Item
                        label={action.name}
                        value={action.id}
                        key={action.name}
                      />
                    )
                )}
            </Picker>
            <Actionhandler
              id={currentAction}
              uuid={"0"}
              savedValue={[]}
              newComponent={true}
              setArgs={setActionArgs}
            />
          </>
        )}
        {module && (
          <>
            <Text style={styles.newTitle}>ACTION</Text>
            <Actionhandler
              id={module._actionID}
              uuid={module._actionUUID}
              savedValue={module._actionSavedValue}
              newComponent={false}
              setArgs={setActionArgs}
            />
          </>
        )}

        {!module && (
          <>
            <Text style={styles.newTitle}>NEW REACTION</Text>
            <Picker
              onValueChange={(itemValue: string) => {
                console.log(itemValue);
                setCurrentReaction(parseInt(itemValue));
              }}
              selectedValue={areaList[currentReaction - 1].name}
            >
              <Picker.Item
                label="Select Reaction "
                value="-1"
                color="#bdb9b9"
              />
              {areaList &&
                areaList.map(
                  (reaction: any) =>
                    reaction.id >= 17 && (
                      <Picker.Item
                        label={reaction.name}
                        value={reaction.id}
                        key={reaction.name}
                      />
                    )
                )}
            </Picker>
            <Reactionhandler
              id={currentReaction}
              uuid={"0"}
              savedValue={[]}
              newComponent={true}
              setArgs={setReactionArgs}
            />
          </>
        )}
        {module && (
          <>
            <Text style={styles.newTitle}>REACTION</Text>
            <Reactionhandler
              id={module._reactionID}
              uuid={module._reactionUUID}
              savedValue={module._reactionSavedValue}
              newComponent={false}
              setArgs={setReactionArgs}
            />
          </>
        )}
        {module && (
          <Pressable onPress={handleDelete} style={styles.delete}>
            <Text style={styles.createTxt}>Delete</Text>
          </Pressable>
        )}
        {!module && (
          <Pressable onPress={handleCreate} style={styles.create}>
            <Text style={styles.createTxt}>Create</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    paddingTop: "50%",
  },
  button: {
    width: "80%",
    backgroundColor: "#3B71F3",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 5,
  },
  container: {
    width: "80%",
  },
  newTitle: {
    color: "white",
    backgroundColor: "#673AB7",
    borderRadius: 23,
    padding: 16,
    margin: 0,
    marginBottom: 5,
    marginTop: 32,
    textAlign: "center",
  },
  create: {
    width: "80%",
    backgroundColor: "rgb(103, 58, 183)",
    padding: 15,
    marginTop: 15,
    marginLeft: 30,
    alignItems: "center",
    borderRadius: 5,
  },
  createTxt: {
    color: "white",
  },
  delete: {
    width: "45%",
    backgroundColor: "#eb2813",
    padding: 15,
    marginLeft: 65,
    marginTop: 15,
    marginBottom: 25,
    alignItems: "center",
    borderRadius: 5,
  },
});

export default AREACard;
