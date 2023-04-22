import { View, Text, Pressable, Image } from "react-native";

const AuthenButton = (props) => {
  const { title, imageURI, action } = props;
  return (
    <Pressable
      style={{
        backgroundColor: "#fff",
        width: "80%",
        padding: 10,
        flexDirection: "row",
        borderRadius: 15,
        marginBottom: 10,
      }}
      onPress={() => action()}
    >
      <View style={{ width: "20%" }}>
        <Image
          source={{
            uri: imageURI,
          }}
          style={{ width: 30, height: 30 }}
        />
      </View>
      <View
        style={{
          justifyContent: "center",
          style: "80%",
        }}
      >
        <Text style={{ marginLeft: "40%" }}>{title}</Text>
      </View>
    </Pressable>
  );
};
export default AuthenButton;
