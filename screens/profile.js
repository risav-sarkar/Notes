import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { getAuth, signOut } from "firebase/auth";

const Profile = () => {
  const HandleSignOut = () => {
    const auth = getAuth();
    signOut(auth).catch((error) => {
      console.log(error);
    });
  };

  return (
    <View style={styles.splashScreen}>
      <TouchableOpacity
        onPress={() => {
          HandleSignOut();
        }}
      >
        <Text>SignOut</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  splashScreen: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Profile;
