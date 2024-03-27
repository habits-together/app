
import { Text, View, TouchableOpacity } from "react-native";
import { Ionicons, Feather, MaterialCommunityIcons, MaterialIcons, Entypo } from '@expo/vector-icons';

export default function SettingsTab() {
  const themeIcon = <Ionicons name="contrast" size={22} />;
  const widgetIcon = <MaterialCommunityIcons name="widgets" size={22} />;
  const purchaseIcon = <Feather name="shopping-cart" size={22} color="black" />;
  const feedbackIcon = <Feather name="send" size={22} color="black" />;
  const rateIcon = <Ionicons name="sparkles-outline" size={22} color="black" />;
  const creditsIcon = <Feather name="award" size={22} color="black" />;
  const privacyIcon = <MaterialIcons name="lock-outline" size={22} color="black" />;
  const termsIcon = <MaterialCommunityIcons name="file-document-outline" size={22} color="black"/>;

  return (
    <View className="flex-1 bg-stone-50 p-4">
      <View className="border border-gray-200 rounded-xl">
        <TouchableOpacity className="flex-row bg-white items-center p-4 rounded-t-xl">
          {themeIcon}
          <Text className="flex-1 pl-3">Theme (dark/ light mode)</Text>
          <Entypo name="chevron-right" size={24} color="lightgray" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row bg-white items-center p-4 border-y border-gray-200">
          {widgetIcon}
          <Text className="flex-1 pl-3">Widget settings</Text>
          <Entypo name="chevron-right" size={24} color="lightgray" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row bg-white items-center p-4 rounded-b-xl">
          {purchaseIcon}
          <Text className="flex-1 pl-3">Purchase unlimited access</Text>
          <Entypo name="chevron-right" size={24} color="lightgray" />
        </TouchableOpacity>
      </View>

      <View className="mt-6 border border-gray-200 rounded-xl">
        <TouchableOpacity className="flex-row bg-white items-center p-4 rounded-t-xl">
          {feedbackIcon}
          <Text className="flex-1 pl-3">Send feedback or report a bug</Text>
          <Entypo name="chevron-right" size={24} color="lightgray" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row bg-white items-center p-4 border-t border-gray-200 rounded-b-xl">
          {rateIcon}
          <Text className="flex-1 pl-3">Rate the app</Text>
          <Entypo name="chevron-right" size={24} color="lightgray" />
        </TouchableOpacity>
      </View>

      <View className="mt-6 border border-gray-200 rounded-xl">
        <TouchableOpacity className="flex-row bg-white items-center p-4 rounded-t-xl">
          {creditsIcon}
          <Text className="flex-1 pl-3">Credits</Text>
          <Entypo name="chevron-right" size={24} color="lightgray" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row bg-white items-center p-4 border-y border-gray-200">
          {privacyIcon}
          <Text className="flex-1 pl-3">Privacy policy</Text>
          <Entypo name="chevron-right" size={24} color="lightgray" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row bg-white items-center p-4 rounded-b-xl">
          {termsIcon}
          <Text className="flex-1 pl-3">Terms of use</Text>
          <Entypo name="chevron-right" size={24} color="lightgray" />
        </TouchableOpacity>
      </View>
    </View>
  );
}