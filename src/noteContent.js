import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const NoteContent = ({ data, editFunc }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        editFunc();
      }}
    >
      <View style={styles.container}>
        <Text style={styles.textTitle}>{data.title}</Text>
        <Text style={styles.textContent}>{data.content}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#14191f",
    borderRadius: 15,
    padding: 20,
    width: Dimensions.get("window").width / 2 - 22.5,
    marginRight: 15,
    marginBottom: 15,
    borderColor: "#32373e",
    borderWidth: 1,
  },
  textTitle: {
    color: "#f1f1f1",
    fontSize: 28,
    marginBottom: 10,
  },
  textContent: {
    color: "#d1d1d1",
    fontSize: 20,
  },
});

export default NoteContent;
