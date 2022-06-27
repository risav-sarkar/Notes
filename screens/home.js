import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  FlatList,
  ScrollView,
} from "react-native";

import { useUserFetch } from "../hooks/useUserFetch";

import CreateNote from "../src/createnote";
import NoteButton from "../src/noteButton";

const Home = ({ navigation }) => {
  const { user, data } = useUserFetch();

  return (
    <View style={styles.homeStyle}>
      <StatusBar animated={false} backgroundColor="#0b0f13" />
      <Text style={styles.titleBar}>Hi {user.displayName}!</Text>
      <CreateNote uid={user.uid} />

      {!data.length ? (
        <View style={styles.emptyText}>
          <Text style={styles.emptyTextStyle}>Create A Note...</Text>
          <Text style={styles.emptyTextStyle}>Things Looks Empty Here!</Text>
        </View>
      ) : (
        <FlatList
          style={styles.flatListStyle}
          data={data}
          renderItem={(e) => {
            return (
              <NoteButton
                navigation={navigation}
                data={e.item}
                uid={user.uid}
              />
            );
          }}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
        />
      )}
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
    fontSize: 34,
    color: "#fff",
    marginBottom: 20,
  },
  flatListStyle: {
    marginTop: 20,
    width: "100%",
    paddingLeft: 15,
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
  },
});

export default Home;
