import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

import { Container, Slogan, Title } from "./styles";
import backgroundImg from "../../assets/background.png";
import { Button } from "../../components/Button";
import { WEB_CLIENT_ID, ANDROID_CLIENT_ID, IOS_CLIENT_ID } from "@env";
import { useEffect, useState } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

WebBrowser.maybeCompleteAuthSession();

GoogleSignin.configure({
  scopes: ["email", "profile"],
  webClientId: WEB_CLIENT_ID,
  offlineAccess: true,
});

export function SignIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [_, response, googleSignIn] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    scopes: ["profile", "email"],
  });

  async function handleGoogleSignIn() {
    setIsAuthenticating(true);

    try {
      await GoogleSignin.hasPlayServices()
      const response = await GoogleSignin.signIn()

      if(response.idToken){
        console.log(`ID Token ===> ${response.idToken}`)
      }
    } catch (error) {
      console.log(error)
    }

    googleSignIn().then((response) => {
      if (response.type !== "success") {
        setIsAuthenticating(false);
      }
    });
  }
  return (
    <Container source={backgroundImg}>
      <Title>Native Fleet</Title>

      <Slogan>Gestão de uso de veículos</Slogan>

      <Button
        title={"Entrar com Google"}
        onPress={handleGoogleSignIn}
        isLoading={isAuthenticating}
      />
    </Container>
  );
}
