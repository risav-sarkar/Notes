import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
} from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";

import { useEffect, useState } from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

import { database } from "../firebaseConfig";
import { useUserFetch } from "../hooks/useUserFetch";
import NoteContent from "../src/noteContent";

const Note = ({ route, navigation }) => {
  const { data } = useUserFetch();

  const [modal, setModal] = useState(false);
  const [titleEdit, setTitleEdit] = useState(false);
  const [editTerm, setEditTerm] = useState("");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [noteData, setNoteData] = useState("");
  const [editingID, setEditingID] = useState(null);

  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  useEffect(() => {
    setNoteData(route.params);
  }, []);

  useEffect(() => {
    if (noteData) {
      let temp = data.filter((e) => e.id === noteData.id);
      temp[0].uid = noteData.uid;
      console.log(temp[0]);
      setNoteData(temp[0]);
    }
  }, [data]);

  useEffect(() => {
    if (noteData.notes) {
      console.log("Data Filtered");
      let arr1 = [],
        arr2 = [];
      for (let i = 0; i < noteData.notes.length; i++) {
        if (i % 2 === 0) {
          arr1.push(noteData.notes[i]);
        } else arr2.push(noteData.notes[i]);
      }

      setData1([...arr1]);
      setData2([...arr2]);
    }
  }, [noteData]);

  const HandleSubmit = () => {
    const docToUpdate = doc(database, noteData.uid, noteData.id);
    if (noteData.notes)
      updateDoc(docToUpdate, {
        notes: [
          ...noteData.notes,
          { title, content, id: noteData.id + noteData.notes.length },
        ],
      });
    else
      updateDoc(docToUpdate, {
        notes: [{ title, content, id: noteData.id + "0" }],
      });
    setModal(false);
    setTitle("");
    setContent("");
  };

  const HandleEdit = () => {
    const docToUpdate = doc(database, noteData.uid, noteData.id);
    let arr = noteData.notes;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === editingID) {
        let obj = { title, content, id: arr[i].id };
        arr[i] = obj;
        break;
      }
    }

    updateDoc(docToUpdate, {
      notes: [...arr],
    });
    setModal(false);
    setTitle("");
    setContent("");
    setEditingID(null);
  };

  const HandleDelete = () => {
    const docToUpdate = doc(database, noteData.uid, noteData.id);
    let arr = noteData.notes;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === editingID) {
        arr.splice(i, 1);
        break;
      }
    }
    for (let i = 0; i < arr.length; i++) {
      let obj = arr[i];
      obj.id = noteData.id + i;
      arr[i] = obj;
    }
    updateDoc(docToUpdate, {
      notes: [...arr],
    });
    setModal(false);
    setTitle("");
    setContent("");
    setEditingID(null);
  };

  const HandleDeleteDoc = () => {
    const docToUpdate = doc(database, noteData.uid, noteData.id);
    deleteDoc(docToUpdate);
    navigation.navigate("Home");
  };

  const HandleNoteFolderEdit = () => {
    const docToUpdate = doc(database, noteData.uid, noteData.id);
    updateDoc(docToUpdate, {
      name: editTerm,
    });
  };

  return (
    <View style={styles.container}>
      {noteData ? (
        <View style={styles.titleBar}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {!titleEdit ? (
              <>
                <TouchableOpacity
                  style={{ padding: 5 }}
                  onPress={() => {
                    navigation.navigate("Home");
                  }}
                >
                  <FontAwesomeIcon
                    size={28}
                    icon={faAngleLeft}
                    color={"#fff"}
                  />
                </TouchableOpacity>

                <Text style={{ fontSize: 32, color: "#fff", marginLeft: 5 }}>
                  {noteData.name}
                </Text>
              </>
            ) : (
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.editInput}
                placeholder="Folder Name"
                value={editTerm}
                onChangeText={setEditTerm}
                placeholderTextColor={"#aaaaaa"}
                maxLength={15}
              />
            )}
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {titleEdit ? (
              <TouchableOpacity
                style={{ padding: 5 }}
                onPress={() => {
                  HandleDeleteDoc();
                }}
              >
                <FontAwesomeIcon size={24} icon={faTrash} color={"#fff"} />
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity
              style={{ padding: 5, marginLeft: 10 }}
              onPress={() => {
                if (titleEdit) {
                  HandleNoteFolderEdit();
                  setTitleEdit(false);
                } else {
                  setEditTerm(noteData.name);
                  setTitleEdit(true);
                }
              }}
            >
              <FontAwesomeIcon
                size={24}
                icon={titleEdit ? faCheck : faEdit}
                color={"#fff"}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      {noteData.notes ? (
        <View style={{ flexDirection: "row", paddingLeft: 15 }}>
          <FlatList
            style={styles.flatListStyle}
            data={data1}
            contentContainerStyle={{ paddingBottom: 120 }}
            renderItem={(e) => {
              return (
                <NoteContent
                  data={e.item}
                  editFunc={() => {
                    setModal(true);
                    setEditingID(e.item.id);
                    setTitle(e.item.title);
                    setContent(e.item.content);
                  }}
                />
              );
            }}
            keyExtractor={(item) => {
              "Even" + item.index;
            }}
            showsHorizontalScrollIndicator={false}
          />
          <FlatList
            style={styles.flatListStyle}
            contentContainerStyle={{ paddingBottom: 120 }}
            data={data2}
            renderItem={(e) => {
              return (
                <NoteContent
                  data={e.item}
                  editFunc={() => {
                    setModal(true);
                    setEditingID(e.item.id);
                    setTitle(e.item.title);
                    setContent(e.item.content);
                  }}
                />
              );
            }}
            keyExtractor={(item) => {
              "Odd" + item.index;
            }}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      ) : (
        <View style={styles.emptyText}>
          <Text style={styles.emptyTextStyle}>Create A Note By</Text>
          <Text style={styles.emptyTextStyle}>
            Pressing The Button At The Corner!
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.createBtn}
        onPress={() => {
          setModal(true);
        }}
      >
        <FontAwesomeIcon size={50} icon={faPlus} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(false);
        }}
      >
        <View style={styles.modal}>
          <View style={styles.modalBar}>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={() => {
                setModal(false);
                setTitle("");
                setContent("");
                setEditingID(null);
              }}
            >
              <FontAwesomeIcon size={40} icon={faXmark} color={"#fff"} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={() => {
                if (editingID === null) HandleSubmit();
                else {
                  HandleEdit();
                }
              }}
            >
              <FontAwesomeIcon size={40} icon={faCheck} color={"#fff"} />
            </TouchableOpacity>
          </View>

          <View style={styles.textField1}>
            <Text style={styles.subHeader}>Title</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.inputStyle1}
              placeholder="Title..."
              value={title}
              onChangeText={setTitle}
              placeholderTextColor={"#aaaaaa"}
              maxLength={15}
            />
          </View>

          <View style={styles.textField2}>
            <Text style={styles.subHeader}>Note</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.inputStyle2}
              placeholder="Write Your Note Here..."
              value={content}
              onChangeText={setContent}
              placeholderTextColor={"#aaaaaa"}
              multiline
            />
          </View>

          {editingID !== null ? (
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => {
                HandleDelete();
              }}
            >
              <FontAwesomeIcon size={30} icon={faTrash} />
            </TouchableOpacity>
          ) : null}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    paddingTop: 20,
    paddingBottom: 40,
    flex: 1,
    backgroundColor: "#0b0f13",
  },
  titleBar: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  createBtn: {
    position: "absolute",
    bottom: 40,
    right: 20,
    padding: 10,
    borderRadius: 100,
    backgroundColor: "#fff",
    zIndex: 999,
  },
  modal: {
    padding: 15,
    backgroundColor: "#0b0f13",
    flex: 1,
    position: "relative",
  },
  deleteBtn: {
    position: "absolute",
    bottom: 25,
    right: 25,
    padding: 15,
    borderRadius: 100,
    backgroundColor: "#fff",
    zIndex: 999,
  },
  modalBar: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  modalBtn: {
    padding: 10,
  },
  subHeader: {
    color: "#fff",
    fontSize: 30,
  },
  textField1: { marginBottom: 20 },
  inputStyle1: {
    color: "#d1d1d1",
    fontSize: 20,
    marginTop: 10,
    backgroundColor: "#14191f",
    borderRadius: 15,
    padding: 20,
    borderColor: "#32373e",
    borderWidth: 1,
  },
  textField2: { flex: 1 },
  inputStyle2: {
    flex: 1,
    marginTop: 10,
    color: "#d1d1d1",
    textAlignVertical: "top",
    fontSize: 20,
    backgroundColor: "#14191f",
    borderRadius: 15,
    padding: 20,
    borderColor: "#32373e",
    borderWidth: 1,
  },
  flatListStyle: {
    marginTop: 20,
  },
  emptyText: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTextStyle: {
    color: "#aaaaaa",
    fontSize: 20,
    marginVertical: 6,
    paddingHorizontal: 20,
    textAlign: "center",
  },
  editInput: {
    color: "#d1d1d1",
    fontSize: 20,
    backgroundColor: "#14191f",
    borderRadius: 15,
    padding: 20,
    borderColor: "#32373e",
    borderWidth: 1,
    width: 250,
  },
});

export default Note;
