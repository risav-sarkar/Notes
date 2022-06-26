import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useUserFetch } from "../hooks/useUserFetch";

const NoteButton = ({ navigation, data, uid }) => {
  data.uid = uid;
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Note", data);
      }}
    >
      <View style={styles.container}>
        <Text style={styles.text}>{data.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#14191f",
    borderRadius: 15,
    padding: 40,
    width: Dimensions.get("window").width / 2 - 22.5,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
    marginBottom: 15,
    borderColor: "#32373e",
    borderWidth: 1,
  },
  text: {
    color: "#fff",
    fontSize: 30,
    textAlign: "center",
  },
});

export default NoteButton;
