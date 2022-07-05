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
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const auth = getAuth();
  const providerGoogle = new GoogleAuthProvider();

  const SetAlert = (e) => {
    setAlertMessage(e);
    const timer = setTimeout(() => {
      setAlertMessage("");
    }, 5000);
    return () => clearTimeout(timer);
  };

  const HandleSubmit = () => {
    if (!email) {
      SetAlert("Enter Your Email!");
      return;
    } else if (!password) {
      SetAlert("Enter Your Password!");
      return;
    }

    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      if (error.message === "Firebase: Error (auth/invalid-email).") {
        SetAlert("Please Enter Valid Email!");
      } else if (error.message === "Firebase: Error (auth/wrong-password).") {
        SetAlert("Password Is Wrong!");
      } else if (error.message === "Firebase: Error (auth/user-not-found).") {
        SetAlert("User Not Found!");
      } else {
        SetAlert(error.message);
      }
    });
  };

  const HandleGoogleLogin = () => {
    // signInWithPopup(auth, providerGoogle)
    //   .then((res) => {
    //     console.log(res.user);
    //   })
    //   .catch((error) => {
    //     alert(error.message);
    //   });
  };

  return (
    <View style={styles.containerStyle}>
      <StatusBar animated={false} backgroundColor="#0b0f13" />
      <View style={styles.loginHeader}>
        <Text style={styles.mainHeader}>Sign In</Text>
        <Text style={styles.subHeader}>Please Sign In To Your Account</Text>
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

          {alertMessage ? (
            <View style={styles.alertBox}>
              <Text style={{ color: "#ed6d65", fontSize: 18 }}>
                {alertMessage}
              </Text>
            </View>
          ) : null}

          <View
            style={{
              alignItems: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("PasswordReset");
              }}
            >
              <Text
                style={{
                  paddingHorizontal: 20,
                  color: "#aaaaaa",
                  paddingBottom: 15,
                }}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              HandleSubmit();
            }}
            style={styles.loginbtn}
          >
            <Text style={{ fontSize: 16, color: "#eaeaea", letterSpacing: 1 }}>
              Sign In
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              textAlign: "center",
              marginVertical: 10,
              color: "#eaeaea",
            }}
          >
            or
          </Text>

          <TouchableOpacity
            onPress={() => {
              HandleGoogleLogin();
            }}
            style={styles.googleBtn}
          >
            <Image
              style={styles.googleLogo}
              source={require("../assets/googleLogo.png")}
            />
            <Text style={{ fontSize: 16 }}>Sign In With Google</Text>
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
              Don't Have An Account?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              <Text
                style={{
                  color: "#214ED0",
                  fontSize: 16,
                  padding: 10,
                }}
              >
                Sign Up
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
  googleBtn: {
    marginHorizontal: 15,
    backgroundColor: "#dbdbdb",
    borderRadius: 20,
    padding: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  googleLogo: {
    height: 30,
    width: 30,
    marginRight: 10,
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

export default Login;
