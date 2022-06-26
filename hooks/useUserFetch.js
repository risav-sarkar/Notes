import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { firebaseApp, database } from "../firebaseConfig";

export const useUserFetch = () => {
  const [user, setUser] = useState("loading");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (user !== "loading" && user !== null) {
      GetData();
    }
  }, [user]);

  const auth = getAuth();
  onAuthStateChanged(auth, (u) => {
    if (u) {
      setUser(u);
    } else setUser(null);
  });

  const GetData = () => {
    const collectionRef = collection(database, user.uid);
    onSnapshot(collectionRef, (e) => {
      let arr = e.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
      arr.sort(function (a, b) {
        let keyA = a.date,
          keyB = b.date;
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });

      setData(arr);
    });
  };

  return { user, data };
};
