import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { getAuth, signOut } from "firebase/auth";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faLock } from "@fortawesome/free-solid-svg-icons/faLock";
import { faEnvelopeCircleCheck } from "@fortawesome/free-solid-svg-icons/faEnvelopeCircleCheck";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons/faArrowRightFromBracket";
import { useUserFetch } from "../hooks/useUserFetch";

const Profile = () => {
  const { user } = useUserFetch();

  const HandleSignOut = () => {
    const auth = getAuth();
    signOut(auth).catch((error) => {
      console.log(error);
    });
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
        >
          <FontAwesomeIcon size={20} icon={faEnvelope} color={"#fff"} />
          <Text style={{ color: "#fff", fontSize: 20, marginLeft: 10 }}>
            Change Your Email
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btnTabs, { marginVertical: 5 }]}>
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
});

export default Profile;
