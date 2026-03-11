import React from "react";
import { Tabs, Link } from "expo-router";
import { Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f8f4ee",
        },
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: "700",
          color: "#1f2933",
        },
        headerShadowVisible: false,
        tabBarActiveTintColor: "#0f766e",
        tabBarInactiveTintColor: "#8a9aa7",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "700",
        },
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: "#fffcf7",
          height: 66,
          paddingTop: 8,
          paddingBottom: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Taches",
          tabBarLabel: "Taches",
          tabBarActiveBackgroundColor: "#e6f4f1",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "checkbox" : "checkbox-outline"}
              size={20}
              color={color}
            />
          ),
          headerRight: () => (
            <Link href="/add-todo" asChild>
              <Pressable
                style={{
                  backgroundColor: "#0f766e",
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  borderRadius: 999,
                  marginRight: 8,
                }}
              >
                <Text
                  style={{
                    color: "#ffffff",
                    fontSize: 14,
                    fontWeight: "700",
                  }}
                >
                  + Ajouter
                </Text>
              </Pressable>
            </Link>
          ),
        }}
      />

      <Tabs.Screen
        name="profil"
        options={{
          title: "Profil",
          tabBarLabel: "Profil",
          tabBarActiveBackgroundColor: "#e6f4f1",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person-circle" : "person-circle-outline"}
              size={20}
              color={color}
            />
          ),
          headerRight: () => null,
        }}
      />
    </Tabs>
  );
}
