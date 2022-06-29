import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
} from "react-native";

import {
  getAuth,
  signOut,
  updatePassword,
  updateEmail,
  deleteUser,
} from "firebase/auth";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faLock } from "@fortawesome/free-solid-svg-icons/faLock";
import { faEnvelopeCircleCheck } from "@fortawesome/free-solid-svg-icons/faEnvelopeCircleCheck";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons/faArrowRightFromBracket";

import { useUserFetch } from "../hooks/useUserFetch";
import { useState } from "react";

const Profile = () => {
  const { user } = useUserFetch();

  const auth = getAuth();

  const [modal, setModal] = useState(false);
  const [inputField, setInputField] = useState("");
  const [type, setType] = useState(null);

  const HandleSignOut = () => {
    signOut(auth).catch((error) => {
      console.log(error);
    });
  };

  const HandleSubmit = () => {
    if (type === 1) {
      updateEmail(auth.currentUser, inputField)
        .then(() => {
          setInputField("");
          setModal(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (type === 2) {
      console.log("Pass");
      updatePassword(user, inputField)
        .then(() => {
          setInputField("");
          setModal(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      deleteUser(user)
        .then(() => {
          setModal(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.textContent}>
          <Text style={{ color: "#fff", fontSize: 28, marginBottom: 15 }}>
            {user ? user.displayName : ""}
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesomeIcon
              size={18}
              icon={faEnvelopeCircleCheck}
              color={"#fff"}
            />
            <Text style={{ marginLeft: 10, color: "#fff", fontSize: 16 }}>
              {user ? user.email : ""}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.logOutBtn}
          onPress={() => {
            HandleSignOut();
          }}
        >
          <FontAwesomeIcon
            size={28}
            icon={faArrowRightFromBracket}
            color={"#ed6d65"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={[
            styles.btnTabs,
            { borderTopLeftRadius: 15, borderTopRightRadius: 15 },
          ]}
          onPress={() => {
            setModal(true);
            setType(1);
          }}
        >
          <FontAwesomeIcon size={20} icon={faEnvelope} color={"#fff"} />
          <Text style={{ color: "#fff", fontSize: 20, marginLeft: 10 }}>
            Change Your Email
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btnTabs, { marginVertical: 5 }]}
          onPress={() => {
            setModal(true);
            setType(2);
          }}
        >
          <FontAwesomeIcon size={20} icon={faLock} color={"#fff"} />
          <Text style={{ color: "#fff", fontSize: 20, marginLeft: 10 }}>
            Change Your Password
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.btnTabs,
            {
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
            },
          ]}
          onPress={() => {
            setModal(true);
            setType(3);
          }}
        >
          <FontAwesomeIcon
            size={20}
            icon={faArrowRightFromBracket}
            color={"#ed6d65"}
          />
          <Text
            style={{
              color: "#ed6d65",
              fontWeight: "bold",
              fontSize: 22,
              marginLeft: 10,
            }}
          >
            Delete Account
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(false);
        }}
      >
        <View style={styles.modal}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <View>
              <View style={styles.modalheader}>
                <Text style={{ color: "#fff", marginBottom: 15, fontSize: 34 }}>
                  {type === 1
                    ? "Change Email"
                    : type === 2
                    ? "Change Password"
                    : "Delete Account"}
                </Text>
                <Text style={{ color: "#aaaaaa", fontSize: 14 }}>
                  {type === 1
                    ? "Enter the email you want to change to"
                    : type === 2
                    ? "Enter the a new password"
                    : "This will permanently delete your account!"}
                </Text>
              </View>

              {type !== 3 ? (
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.inputStyle}
                  placeholder={
                    type === 1
                      ? "Enter new email"
                      : type === 2
                      ? "Enter new password"
                      : ""
                  }
                  value={inputField}
                  onChangeText={setInputField}
                  placeholderTextColor={"#aaaaaa"}
                  multiline
                />
              ) : null}
            </View>

            <TouchableOpacity
              onPress={() => {
                HandleSubmit();
              }}
              style={type === 3 ? styles.deletebtn : styles.btn}
            >
              <Text style={{ fontSize: 18, color: "#fff", letterSpacing: 1 }}>
                Confirm
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setModal(false);
                setInputField("");
              }}
              style={styles.closeBtn}
            >
              <Text
                style={{ fontSize: 16, color: "#eaeaea", letterSpacing: 1 }}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0f13",
    padding: 20,
    marginTop: 40,
  },
  header: {
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textContent: {
    padding: 20,
    borderColor: "#32373e",
    borderWidth: 1,
    backgroundColor: "#14191f",
    flex: 1,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
  },
  logOutBtn: {
    paddingHorizontal: 15,
    justifyContent: "center",
    backgroundColor: "#640716",
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
  },
  btnContainer: {
    borderRadius: 15,
    overflow: "hidden",
    marginVertical: 50,
  },
  btnTabs: {
    padding: 20,
    borderColor: "#32373e",
    borderWidth: 1,
    backgroundColor: "#14191f",
    flexDirection: "row",
    alignItems: "center",
  },
  modal: {
    padding: 20,
    backgroundColor: "#0b0f13",
    flex: 1,
    position: "relative",
  },
  inputStyle: {
    borderWidth: 2,
    paddingVertical: 20,
    paddingHorizontal: 30,
    fontSize: 20,
    marginBottom: 15,
    color: "#fff",
    backgroundColor: "#14191f",
    borderRadius: 20,
    borderColor: "#32373e",
    borderWidth: 1,
  },
  btn: {
    backgroundColor: "#214ED0",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  deletebtn: {
    backgroundColor: "#640716",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  closeBtn: {
    padding: 20,
    alignItems: "center",
  },
  modalheader: {
    marginBottom: 40,
    alignItems: "center",
    textAlign: "center",
  },
});

export default Profile;
