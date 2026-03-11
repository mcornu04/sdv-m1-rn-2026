import React from "react";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { TodoCard } from "@/components/todo-card";
import { useTodos } from "@/hooks/use-todos";

export default function HomeScreen() {
  const router = useRouter();
  const { todos, isLoading, error, toggleTodoStatus, deleteTodo } = useTodos();

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0f766e" />
        <Text style={styles.loadingText}>Chargement des taches...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Ma liste du jour</Text>
          <Text style={styles.heroSubtitle}>
            Appuie sur une carte pour changer son statut.
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.statBadge}>
              <Text style={styles.statNumber}>{todos.length}</Text>
              <Text style={styles.statLabel}>tâches</Text>
            </View>
            <View style={[styles.statBadge, styles.statBadgeDone]}>
              <Text style={[styles.statNumber, styles.statNumberDone]}>
                {todos.filter((t) => t.subtitle === "Fait").length}
              </Text>
              <Text style={[styles.statLabel, styles.statLabelDone]}>
                faites
              </Text>
            </View>
            <View style={[styles.statBadge, styles.statBadgeTodo]}>
              <Text style={[styles.statNumber, styles.statNumberTodo]}>
                {todos.filter((t) => t.subtitle === "a faire").length}
              </Text>
              <Text style={[styles.statLabel, styles.statLabelTodo]}>
                restantes
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.list}>
          {todos.map((todo) => (
            <React.Fragment key={todo.id}>
              <TodoCard
                title={todo.title}
                subtitle={todo.subtitle}
                titleOpacity={todo.titleOpacity}
                subtitleOpacity={todo.subtitleOpacity}
                titleItalic={todo.titleItalic}
                titleLineThrough={todo.titleLineThrough}
                onPress={() => toggleTodoStatus(todo.id)}
                onNavigate={() => router.push(`/todo/${todo.id}`)}
                onDelete={() => deleteTodo(todo.id)}
              />
            </React.Fragment>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffaf2",
  },
  centered: {
    flex: 1,
    backgroundColor: "#fffaf2",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: "#52606d",
  },
  errorText: {
    fontSize: 15,
    color: "#dc2626",
    textAlign: "center",
    paddingHorizontal: 24,
  },
  scrollContent: {
    paddingHorizontal: 14,
    paddingTop: 18,
    paddingBottom: 24,
  },
  hero: {
    marginBottom: 14,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1f2933",
  },
  heroSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#52606d",
  },
  statsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  statBadge: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#f1f5f9",
  },
  statBadgeDone: {
    backgroundColor: "#d1fae5",
  },
  statBadgeTodo: {
    backgroundColor: "#fef3c7",
  },
  statNumber: {
    fontSize: 16,
    fontWeight: "800",
    color: "#334155",
  },
  statNumberDone: {
    color: "#0f766e",
  },
  statNumberTodo: {
    color: "#b45309",
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748b",
  },
  statLabelDone: {
    color: "#0f766e",
  },
  statLabelTodo: {
    color: "#b45309",
  },
  list: {
    gap: 12,
  },
});
