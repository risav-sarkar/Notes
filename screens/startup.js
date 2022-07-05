import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";

const StartUp = ({ navigation }) => {
  return (
    <View style={styles.containerStyle}>
      <StatusBar animated={false} backgroundColor="#0b0f13" />

      <View style={styles.startupScreen}>
        <Image style={styles.img} source={require("../assets/logo.png")} />
        <Text style={styles.mainHeader}>Notes</Text>
        <Text style={styles.subHeader}>
          Take notes or remainders, into folders and keep them well organized!
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
          style={styles.btn}
        >
          <Text style={{ fontSize: 16, color: "#eaeaea", letterSpacing: 1 }}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: "#0b0f13",
    justifyContent: "center",
  },
  startupScreen: {
    alignItems: "center",
  },
  mainHeader: { color: "#fff", marginBottom: 15, fontSize: 34 },
  subHeader: {
    color: "#aaaaaa",
    fontSize: 14,
    width: 250,
    textAlign: "center",
  },
  btn: {
    marginTop: 30,
    backgroundColor: "#214ED0",
    borderRadius: 50,
    padding: 20,
    paddingHorizontal: 30,
    alignItems: "center",
  },
  img: { height: 120, width: 120, marginBottom: 20 },
});

export default StartUp;
