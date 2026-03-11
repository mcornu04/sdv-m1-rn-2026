import React from "react";
import { useRouter } from "expo-router";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useTodos } from "@/hooks/use-todos";

export default function AddTodoScreen() {
  const router = useRouter();
  const { addTodo } = useTodos();
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleCreateTodo = () => {
    if (!title.trim()) {
      Alert.alert("Titre requis", "Ajoute un titre avant de creer la tache.");
      return;
    }

    addTodo(title, description);
    setTitle("");
    setDescription("");
    router.replace("/(tabs)");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.kicker}>CREATION</Text>
        <Text style={styles.heading}>Nouvelle tache</Text>
        <Text style={styles.subheading}>
          Prepare une todo claire et actionnable.
        </Text>

        <View style={styles.formCard}>
          <Text style={styles.label}>Titre</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Ex: Reviser Expo Router"
            placeholderTextColor="#94a3b8"
            style={styles.input}
            returnKeyType="done"
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Details de la tache"
            placeholderTextColor="#94a3b8"
            style={[styles.input, styles.multilineInput]}
            multiline
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={handleCreateTodo}
        >
          <Text style={styles.buttonText}>Creer la todo</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffaf2",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 24,
  },
  kicker: {
    color: "#0f766e",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
  },
  heading: {
    fontSize: 30,
    fontWeight: "800",
    marginTop: 2,
    color: "#1f2933",
  },
  subheading: {
    marginTop: 4,
    marginBottom: 16,
    color: "#52606d",
    fontSize: 14,
  },
  formCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#ece5dc",
    padding: 14,
    shadowColor: "#7f5f3f",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  label: {
    color: "#334155",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
    marginTop: 8,
  },
  input: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "#0f172a",
  },
  multilineInput: {
    minHeight: 110,
    textAlignVertical: "top",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#0f766e",
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: 14,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },
});
