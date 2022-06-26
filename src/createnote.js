import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons/faPaperPlane";
import { collection, addDoc } from "firebase/firestore";
import { database } from "../firebaseConfig";

const CreateNote = ({ uid }) => {
  const [term, setTerm] = useState(null);

  const HandleSubmit = () => {
    if (!term) return;
    const d = new Date();
    let date = d.getTime();
    const collectionRef = collection(database, uid);
    addDoc(collectionRef, { name: term, date }).catch((err) => {
      alert(err);
    });
  };

  return (
    <>
      <View style={styles.backgroundStyle}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.inputStyle}
          placeholder="Create A Notes Folder"
          value={term}
          onChangeText={setTerm}
          placeholderTextColor={"grey"}
          maxLength={15}
        />
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => HandleSubmit()}
        >
          <FontAwesomeIcon size={28} icon={faPaperPlane} color={"#000000"} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    marginHorizontal: 15,
    backgroundColor: "transparent",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    overflow: "hidden",
  },

  submitBtn: {
    padding: 10,
    backgroundColor: "#fff",
    height: "100%",
    width: 60,
    alignItems: "center",
    flexDirection: "row",
  },

  inputStyle: {
    color: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 18,
    flex: 1,
  },
});

export default CreateNote;
