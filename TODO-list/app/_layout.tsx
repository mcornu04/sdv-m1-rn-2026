import React from "react";
import { Stack } from "expo-router";

import { TodosProvider } from "@/hooks/use-todos";

export default function RootLayout() {
  return (
    <TodosProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#fffcf7",
          },
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "700",
            color: "#1f2933",
          },
          headerTintColor: "#0f766e",
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, title: "Home" }}
        />
        <Stack.Screen
          name="add-todo"
          options={{
            title: "Nouvelle todo",
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="todo/[id]"
          options={{
            title: "Détail",
          }}
        />
      </Stack>
    </TodosProvider>
  );
}
