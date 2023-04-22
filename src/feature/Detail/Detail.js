import { View, Text, Image } from "react-native";
const Detail = ({ route }) => {
  const { profile, name, email } = route.params;
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={{
          uri: profile,
        }}
        style={{ width: 100, height: 100, borderRadius: 50 }}
      />
      <Text>{name}</Text>
      <Text>{email}</Text>
    </View>
  );
};
export default Detail;
