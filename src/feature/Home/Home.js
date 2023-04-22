import React, { useEffect } from "react";
import { View, Text, Pressable, Image } from "react-native";
import AuthenButton from "../../component/AuthenButton";
import * as AuthSession from "expo-auth-session";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";
import { useNavigation } from "@react-navigation/native";
import * as Google from "expo-auth-session/providers/google";
import * as AppleAuthentication from "expo-apple-authentication";

WebBrowser.maybeCompleteAuthSession();

const Home = () => {
  const navigation = useNavigation();

  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: "935325850948026",
  });

  const [Googlerequest, Googleresponse, GooglepromptAsync] =
    Google.useAuthRequest({
      androidClientId:
        "887674033555-oj4ss8dlvt98tos6dkr93im4kpp5rk50.apps.googleusercontent.com",
      iosClientId:
        "887674033555-otuepk5nvtjctqn2tch11aftr90vp3q2.apps.googleusercontent.com",
      expoClientId:
        "887674033555-iid78ccd8oj89sh0p6j1v0pfrgfdeocn.apps.googleusercontent.com",
    });

  useEffect(() => {
    if (Googleresponse?.type === "success") {
      getUserInfo(Googleresponse.authentication.accessToken);
    }
  }, [Googleresponse]);

  const getUserInfo = async (token) => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      navigation.navigate("Detail", {
        profile: user.picture,
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      // Add your own error handler here
    }
  };

  useEffect(() => {
    if (response && response.type === "success" && response.authentication) {
      (async () => {
        const userInfoResponse = await fetch(
          `https://graph.facebook.com/me?access_token=${response.authentication.accessToken}&fields=id,email,name,picture.type(large)`
        );
        const userInfo = await userInfoResponse.json();
        // setUser(userInfo);
        navigation.navigate("Detail", {
          profile: userInfo.picture.data.url,
          name: userInfo.name,
          email: userInfo.email,
        });
      })();
    }
  }, [response]);

  const GoogleAuth = async () => {
    GooglepromptAsync();
  };
  const FacebookAuth = () => {
    promptAsync();
  };
  const AppleAuth = async () => {
    console.log("check data : ");

    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      // signed in

      console.log("check data : ", credential);
    } catch (e) {
      console.log("error : ", e);
      if (e.code === "ERR_REQUEST_CANCELED") {
        // handle that the user canceled the sign-in flow
      } else {
        // handle other errors
      }
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
      }}
    >
      <AuthenButton
        imageURI="https://play-lh.googleusercontent.com/6UgEjh8Xuts4nwdWzTnWH8QtLuHqRMUB7dp24JYVE2xcYzq4HA8hFfcAbU-R-PC_9uA1"
        title="Google"
        action={GoogleAuth}
      />
      <AuthenButton
        imageURI="https://i.pinimg.com/originals/ce/d6/6e/ced66ecfc53814d71f8774789b55cc76.png"
        title="Facebook"
        action={FacebookAuth}
      />

      <AuthenButton
        imageURI="https://alchemyimmersive.com/wp-content/uploads/sites/4/2020/04/apple-logo-transparent.png"
        title="Apple"
        action={AppleAuth}
      />
    </View>
  );
};
export default Home;
