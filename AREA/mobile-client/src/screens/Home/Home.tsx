import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getModules } from "../../services/Modules/ModulesApi";
import { getValue } from "../../services/Storage/LocalStorage";
import AREACard from "../../components/AREACard/AREACard";

type Nav = {
  navigate: (value: string) => void;
  dispatch: (value: any) => void;
};

type Modules = {
  _actionUUID: string;
  _actionID: number;
  _actionSavedValue: string[];
  _reactionUUID: string;
  _reactionID: number;
  _reactionSavedValue: string[];
};

const Home = () => {
  const navigation = useNavigation<Nav>();

  const [moduleList, setModuleList] = useState<Modules[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (isLoaded) return;
    (async () => {
      const token = await getValue("token");
      const tmp = await getModules({
        token: token,
      });
      setModuleList(tmp);
      setIsLoaded(true);
    })();
  }, [isLoaded]);

  const handleCreate = () => {
    navigation.navigate("CreateAREA");
  };

  return (
    <View style={styles.root}>
      <Pressable onPress={handleCreate} style={styles.create}>
        <Text style={styles.createTxt}>CREATE</Text>
      </Pressable>
      <ScrollView style={styles.scroll}>
        {moduleList &&
          moduleList.map((module: Modules) => (
            <AREACard
              key={module._actionUUID + module._reactionUUID + ""}
              module={module}
            />
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#E3F2FD",
    height: "100%",
    alignItems: "center",
    paddingTop: "20%",
  },
  create: {
    width: "80%",
    backgroundColor: "rgb(103, 58, 183)",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 5,
  },
  createTxt: {
    color: "white",
  },
  scroll: {
    paddingTop: 32,
    width: "80%",
    height: "80%",
  },
});

export default Home;
