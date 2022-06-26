import { Text, StyleSheet, View, StatusBar } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { firebaseApp, database } from "../firebaseConfig";

import { useUserFetch } from "../hooks/useUserFetch";

import CreateNote from "../src/createnote";
import NoteButton from "../src/noteButton";

const Home = ({ navigation }) => {
  const { user, data } = useUserFetch();

  return (
    <View style={styles.homeStyle}>
      <StatusBar animated={false} backgroundColor="#0b0f13" />
      <Text style={styles.titleBar}>Notes</Text>
      <CreateNote uid={user.uid} />
      <FlatList
        style={styles.flatListStyle}
        data={data}
        renderItem={(e) => {
          return (
            <NoteButton navigation={navigation} data={e.item} uid={user.uid} />
          );
        }}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  homeStyle: {
    flex: 1,
    backgroundColor: "#0b0f13",
    paddingTop: 20,
  },
  titleBar: {
    paddingHorizontal: 25,
    fontSize: 40,
    color: "#fff",
    marginBottom: 20,
  },
  flatListStyle: {
    marginTop: 20,
    width: "100%",
    paddingLeft: 15,
  },
});

export default Home;
