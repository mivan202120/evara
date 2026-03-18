import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background items-center justify-center" style={{ paddingTop: insets.top }}>
      <MaterialIcons name="person" size={48} color="#d5c3bd" />
      <Text className="mt-4" style={{ fontFamily: "PlusJakartaSans_700Bold", color: "#201a19", fontSize: 24 }}>
        Profile
      </Text>
      <Text className="mt-2" style={{ fontFamily: "Manrope_400Regular", color: "#514440", fontSize: 14 }}>
        Coming in Phase 3
      </Text>
    </View>
  );
}
