import { Text, View } from "@/src/components/Themed";
import { resetNavigationStack } from "@/src/lib/resetNavigationStack";
import { TouchableOpacity } from "react-native";

export default function Createprofile() {
  return (
    <View className="mt-16">
      <Text>Create Profile</Text>
      <TouchableOpacity
        onPress={() => resetNavigationStack("/")}
        className="m-2 bg-grey-400 p-8"
      >
        <Text>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
}
