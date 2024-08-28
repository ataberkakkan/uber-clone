import { View, Text, Image, Alert } from "react-native";
import { useCallback } from "react";
import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { googleOauth } from "@/lib/auth";
import CustomButton from "./CustomButton";

import { icons } from "@/constants";

const OAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const router = useRouter();

  const handleGoogleSignIn = useCallback(async () => {
    try {
      const result = await googleOauth(startOAuthFlow);

      if (result.code === "session_exists") {
        Alert.alert("Success", "Session Exists. Redirecting to hom page");
        router.replace("/(root)/(tabs)/home");
      }

      Alert.alert(result.success ? "Success" : "Error", result.message);
      router.replace("/(root)/(tabs)/home");
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>

      <CustomButton
        title="Log In with Google"
        className="mt-5 w-full shadow-none"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};
export default OAuth;
