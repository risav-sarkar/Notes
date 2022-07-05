import { Text, StyleSheet, View, Image } from "react-native";

const SplashScreen = () => {
  return (
    <View style={styles.splashScreen}>
      <Image style={styles.img} source={require("../assets/logo.png")} />
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
  img: { height: 120, width: 120, marginBottom: 20 },
});

export default SplashScreen;
