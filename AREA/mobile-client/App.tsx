import { SafeAreaView, StyleSheet, Text } from "react-native";
import Navigation from "./src/navigation";

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Navigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#E3F2FD",
  },
});

export default App;
