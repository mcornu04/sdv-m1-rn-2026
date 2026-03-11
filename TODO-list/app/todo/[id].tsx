import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useTodos } from "@/hooks/use-todos";

export default function TodoDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { todos, toggleTodoStatus, updateTodo, deleteTodo } = useTodos();

  const todo = todos.find((t) => t.id === id);

  const [newTitle, setNewTitle] = React.useState("");

  if (!todo) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Todo introuvable.</Text>
      </View>
    );
  }

  const isDone = todo.subtitle === "Fait";

  const handleUpdate = () => {
    if (!newTitle.trim()) {
      Alert.alert(
        "Titre requis",
        "Saisis un titre pour mettre à jour la tache.",
      );
      return;
    }
    updateTodo(todo.id, newTitle);
    setNewTitle("");
    Alert.alert("Mis à jour !", `"${newTitle.trim()}" a été sauvegardé.`);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ── Détail de la todo ── */}
        <View style={styles.detailCard}>
          <Text style={styles.detailLabel}>TITRE</Text>
          <Text style={styles.detailTitle}>{todo.title}</Text>

          <View style={styles.statusRow}>
            <View
              style={[
                styles.statusBadge,
                isDone ? styles.statusBadgeDone : styles.statusBadgeTodo,
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  isDone ? styles.statusTextDone : styles.statusTextTodo,
                ]}
              >
                {todo.subtitle.toUpperCase()}
              </Text>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.toggleButton,
                pressed && styles.toggleButtonPressed,
              ]}
              onPress={() => {
                toggleTodoStatus(todo.id);
              }}
            >
              <Ionicons
                name={isDone ? "refresh-outline" : "checkmark-circle-outline"}
                size={16}
                color="#0f766e"
              />
              <Text style={styles.toggleButtonText}>
                {isDone ? "Marquer à faire" : "Marquer fait"}
              </Text>
            </Pressable>
          </View>

          {todo.description ? (
            <>
              <Text style={[styles.detailLabel, { marginTop: 16 }]}>
                DESCRIPTION
              </Text>
              <Text style={styles.detailDescription}>{todo.description}</Text>
            </>
          ) : null}
        </View>

        {/* ── Modifier le titre ── */}
        <Text style={styles.sectionTitle}>Modifier le titre</Text>

        <View style={styles.formCard}>
          <Text style={styles.inputLabel}>Nouveau titre</Text>
          <TextInput
            value={newTitle}
            onChangeText={setNewTitle}
            placeholder={todo.title}
            placeholderTextColor="#94a3b8"
            style={styles.input}
            returnKeyType="done"
          />
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.saveButton,
            pressed && styles.saveButtonPressed,
          ]}
          onPress={handleUpdate}
        >
          <Text style={styles.saveButtonText}>Sauvegarder</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.deleteButton,
            pressed && styles.deleteButtonPressed,
          ]}
          onPress={() => {
            Alert.alert(
              "Supprimer la tâche",
              "Cette action est irréversible.",
              [
                { text: "Annuler", style: "cancel" },
                {
                  text: "Supprimer",
                  style: "destructive",
                  onPress: () => {
                    deleteTodo(todo.id);
                    router.back();
                  },
                },
              ],
            );
          }}
        >
          <Ionicons name="trash-outline" size={16} color="#dc2626" />
          <Text style={styles.deleteButtonText}>Supprimer la tâche</Text>
        </Pressable>
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
    paddingBottom: 32,
  },
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fffaf2",
  },
  notFoundText: {
    fontSize: 16,
    color: "#52606d",
  },
  detailCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#ece5dc",
    padding: 18,
    shadowColor: "#7f5f3f",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    marginBottom: 24,
  },
  detailLabel: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    color: "#94a3b8",
    marginBottom: 6,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1f2933",
    marginBottom: 14,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  statusBadgeTodo: {
    backgroundColor: "#fef3c7",
  },
  statusBadgeDone: {
    backgroundColor: "#d1fae5",
  },
  statusText: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.6,
  },
  statusTextTodo: {
    color: "#b45309",
  },
  statusTextDone: {
    color: "#0f766e",
  },
  toggleButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#0f766e",
  },
  toggleButtonPressed: {
    opacity: 0.7,
  },
  toggleButtonText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0f766e",
  },
  detailDescription: {
    fontSize: 15,
    color: "#334155",
    lineHeight: 22,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1f2933",
    marginBottom: 10,
  },
  formCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#ece5dc",
    padding: 14,
    shadowColor: "#7f5f3f",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  inputLabel: {
    color: "#334155",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
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
  saveButton: {
    marginTop: 16,
    backgroundColor: "#0f766e",
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: 14,
  },
  saveButtonPressed: {
    opacity: 0.8,
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },
  deleteButton: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#dc2626",
    paddingVertical: 13,
  },
  deleteButtonPressed: {
    opacity: 0.7,
  },
  deleteButtonText: {
    color: "#dc2626",
    fontSize: 15,
    fontWeight: "700",
  },
});
