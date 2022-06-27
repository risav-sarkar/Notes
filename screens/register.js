import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { useEffect, useState } from "react";
import { firebaseApp } from "../firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const auth = getAuth();

  const SetAlert = (e) => {
    setAlertMessage(e);
    const timer = setTimeout(() => {
      setAlertMessage("");
    }, 5000);
    return () => clearTimeout(timer);
  };

  const HandleSubmit = () => {
    if (!name) {
      SetAlert("Enter Your Name!");
      return;
    } else if (!email) {
      SetAlert("Enter Your Email!");
      return;
    } else if (!password) {
      SetAlert("Enter Your Password!");
      return;
    } else if (!confirmPassword) {
      SetAlert("Enter Your Password Again!");
      return;
    } else if (password !== confirmPassword) {
      SetAlert("Passwords Do Not Match!");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        updateProfile(auth.currentUser, {
          displayName: name,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.containerStyle}>
      <StatusBar animated={false} backgroundColor="#0b0f13" />
      <View style={styles.loginHeader}>
        <Text style={styles.mainHeader}>Sign Up</Text>
        <Text style={styles.subHeader}>Please Fill The Details </Text>
      </View>

      <View style={{ justifyContent: "center", flex: 1, paddingVertical: 20 }}>
        <View>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.inputStyle}
            placeholder="Name"
            value={name}
            onChangeText={setName}
            placeholderTextColor={"#aaaaaa"}
            maxLength={15}
          />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.inputStyle}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor={"#aaaaaa"}
          />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.inputStyle}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            placeholderTextColor={"#aaaaaa"}
            secureTextEntry={true}
          />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.inputStyle}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholderTextColor={"#aaaaaa"}
            secureTextEntry={true}
          />

          {alertMessage ? (
            <View style={styles.alertBox}>
              <Text style={{ color: "#ed6d65", fontSize: 18 }}>
                {alertMessage}
              </Text>
            </View>
          ) : null}

          <TouchableOpacity
            onPress={() => {
              HandleSubmit();
            }}
            style={styles.loginbtn}
          >
            <Text style={{ fontSize: 16, color: "#eaeaea", letterSpacing: 1 }}>
              Sign Up
            </Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <Text style={{ color: "#eaeaea", fontSize: 16 }}>
              Already Have An Account?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text
                style={{
                  color: "#214ED0",
                  fontSize: 16,
                  padding: 10,
                }}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: "#0b0f13",
    position: "relative",
    paddingBottom: 40,
  },
  loginHeader: { alignItems: "center", marginVertical: 80 },
  mainHeader: { color: "#fff", marginBottom: 15, fontSize: 34 },
  subHeader: { color: "#aaaaaa", fontSize: 14 },
  inputStyle: {
    marginHorizontal: 15,
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
  loginbtn: {
    marginHorizontal: 15,
    backgroundColor: "#214ED0",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  alertBox: {
    backgroundColor: "#3d1515",
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
  },
});

export default Register;
