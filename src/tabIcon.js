import { Text, StyleSheet, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";

const TabIcon = ({ name, selected }) => {
  return (
    <FontAwesomeIcon
      size={28}
      icon={name === "Home" ? faHouse : faUser}
      color={selected ? "#fff" : "#c4c4c4"}
    />
  );
};

export default TabIcon;
