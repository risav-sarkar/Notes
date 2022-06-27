import { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";

import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const PasswordReset = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const SetAlert = (e) => {
    setAlertMessage(e);
    const timer = setTimeout(() => {
      setAlertMessage("");
    }, 5000);
    return () => clearTimeout(timer);
  };

  const ResetEmail = () => {
    setSuccess(false);
    if (!email) {
      SetAlert("Enter Your Email!");
      return;
    }
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then((res) => {
        setSuccess(true);
        setAlertMessage("");
      })
      .catch((error) => {
        console.log(error.message);
        if (error.message === "Firebase: Error (auth/user-not-found).") {
          SetAlert("User Not Found!");
        } else if (error.message === "Firebase: Error (auth/invalid-email).") {
          SetAlert("Please Enter Valid Email!");
        }
      });
  };

  return (
    <View style={styles.containerStyle}>
      <StatusBar animated={false} backgroundColor="#0b0f13" />
      <View style={styles.loginHeader}>
        <Text style={styles.mainHeader}>Reset Password?</Text>
        <Text style={styles.subHeader}>
          Enter Your Registered Email To Receive Password Reset Instruction
        </Text>
      </View>

      <View style={{ justifyContent: "center", flex: 1 }}>
        <View>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.inputStyle}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor={"#aaaaaa"}
          />

          {alertMessage ? (
            <View style={styles.alertBox}>
              <Text style={{ color: "#ed6d65", fontSize: 18 }}>
                {alertMessage}
              </Text>
            </View>
          ) : null}

          {success ? (
            <View style={styles.successBox}>
              <Text style={{ color: "#65d372", fontSize: 18 }}>
                Check Your Inbox For Email!
              </Text>
            </View>
          ) : null}
          <TouchableOpacity
            onPress={() => {
              ResetEmail();
            }}
            style={styles.loginbtn}
          >
            <Text style={{ fontSize: 16, color: "#eaeaea", letterSpacing: 1 }}>
              Send
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
              Remembered Password?{" "}
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
  subHeader: {
    color: "#aaaaaa",
    fontSize: 14,
    width: 250,
    textAlign: "center",
  },
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
  successBox: {
    backgroundColor: "#1a2b20",
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
  },
});

export default PasswordReset;
