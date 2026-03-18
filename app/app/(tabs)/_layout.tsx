import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type TabIconProps = {
  name: keyof typeof MaterialIcons.glyphMap;
  label: string;
  focused: boolean;
};

function TabIcon({ name, label, focused }: TabIconProps) {
  if (focused) {
    return (
      <View className="items-center justify-center bg-primary rounded-full p-3 -mt-2 shadow-lg"
        style={{
          shadowColor: "#865043",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3,
          shadowRadius: 16,
          elevation: 12,
          transform: [{ scale: 1.1 }],
        }}>
        <MaterialIcons name={name} size={24} color="#ffffff" />
      </View>
    );
  }

  return (
    <View className="items-center justify-center p-3">
      <MaterialIcons name={name} size={24} color="#d5c3bd" />
      <Text className="font-label text-[10px] uppercase tracking-widest mt-1"
        style={{ color: "#d5c3bd", fontFamily: "Manrope_700Bold" }}>
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 16,
          left: 16,
          right: 16,
          height: 72,
          borderRadius: 9999,
          backgroundColor: "rgba(255, 248, 246, 0.85)",
          borderTopWidth: 0,
          shadowColor: "#865043",
          shadowOffset: { width: 0, height: -8 },
          shadowOpacity: 0.08,
          shadowRadius: 20,
          elevation: 20,
          paddingBottom: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name="home" label="Home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="programs"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name="fitness-center" label="Programs" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name="insert-chart" label="Progress" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name="person" label="Profile" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
