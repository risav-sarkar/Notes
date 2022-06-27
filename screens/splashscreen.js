import { Text, StyleSheet, View } from "react-native";

const SplashScreen = () => {
  return (
    <View style={styles.splashScreen}>
      <Text style={{ color: "#fff", fontSize: 30 }}>Notes</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  splashScreen: {
    flex: 1,
    backgroundColor: "#0b0f13",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SplashScreen;
