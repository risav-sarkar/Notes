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
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          HandleSignOut();
        }}
      >
        <Text style={{ color: "#fff" }}>SignOut</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0f13",
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Profile;
