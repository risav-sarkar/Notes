import { Text, StyleSheet, View } from "react-native";

const SplashScreen = () => {
  return (
    <View style={styles.splashScreen}>
      <Text>Hi</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  splashScreen: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SplashScreen;
