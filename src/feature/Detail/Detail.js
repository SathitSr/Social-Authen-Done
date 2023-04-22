import { View, Text, Image } from "react-native";
const Detail = ({ route }) => {
  const { userInfo } = route.params;
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={{
          uri: userInfo.picture.data.url,
        }}
        style={{ width: 100, height: 100, borderRadius: 50 }}
      />
      <Text>{userInfo.name}</Text>
      <Text>{userInfo.email}</Text>
    </View>
  );
};
export default Detail;
