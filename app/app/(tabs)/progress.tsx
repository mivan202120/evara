import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

export default function ProgressScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background items-center justify-center" style={{ paddingTop: insets.top }}>
      <MaterialIcons name="insert-chart" size={48} color="#d5c3bd" />
      <Text className="mt-4" style={{ fontFamily: "PlusJakartaSans_700Bold", color: "#201a19", fontSize: 24 }}>
        Progress
      </Text>
      <Text className="mt-2" style={{ fontFamily: "Manrope_400Regular", color: "#514440", fontSize: 14 }}>
        Coming in Phase 4
      </Text>
    </View>
  );
}
