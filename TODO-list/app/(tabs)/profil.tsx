import React from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  type DummyJsonTodo,
  type DummyJsonUser,
  fetchTodosByUser,
  fetchUsers,
} from "@/services/todos-api";

export default function ProfilScreen() {
  const [users, setUsers] = React.useState<DummyJsonUser[]>([]);
  const [selectedUser, setSelectedUser] = React.useState<DummyJsonUser | null>(
    null,
  );
  const [userTodos, setUserTodos] = React.useState<DummyJsonTodo[]>([]);
  const [loadingUsers, setLoadingUsers] = React.useState(true);
  const [loadingTodos, setLoadingTodos] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetchUsers(10)
      .then(setUsers)
      .catch(() => setError("Impossible de charger les utilisateurs."))
      .finally(() => setLoadingUsers(false));
  }, []);

  const handleSelectUser = (user: DummyJsonUser) => {
    if (selectedUser?.id === user.id) return;
    setSelectedUser(user);
    setUserTodos([]);
    setLoadingTodos(true);
    fetchTodosByUser(user.id)
      .then(setUserTodos)
      .catch(() => setError("Impossible de charger les tâches."))
      .finally(() => setLoadingTodos(false));
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* ── En-tête ── */}
      <Text style={styles.kicker}>PROFIL</Text>
      <Text style={styles.title}>Choisir un utilisateur</Text>

      {/* ── Sélecteur d'utilisateurs ── */}
      {loadingUsers ? (
        <ActivityIndicator color="#0f766e" size="large" style={styles.loader} />
      ) : error && users.length === 0 ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.userListContent}
          style={styles.userList}
        >
          {users.map((user) => {
            const isSelected = selectedUser?.id === user.id;
            return (
              <Pressable
                key={user.id}
                style={[styles.userPill, isSelected && styles.userPillSelected]}
                onPress={() => handleSelectUser(user)}
              >
                <Image
                  source={{ uri: user.image }}
                  style={[
                    styles.userAvatar,
                    isSelected && styles.userAvatarSelected,
                  ]}
                />
                <Text
                  style={[
                    styles.userPillText,
                    isSelected && styles.userPillTextSelected,
                  ]}
                >
                  {user.firstName}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      )}

      {/* ── Tâches du user sélectionné ── */}
      {selectedUser && (
        <>
          <Text style={styles.sectionTitle}>
            Tâches de {selectedUser.firstName} {selectedUser.lastName}
          </Text>

          {loadingTodos ? (
            <ActivityIndicator
              color="#0f766e"
              size="small"
              style={styles.loader}
            />
          ) : userTodos.length === 0 ? (
            <Text style={styles.emptyText}>
              Aucune tâche pour cet utilisateur.
            </Text>
          ) : (
            userTodos.map((todo) => (
              <View key={todo.id} style={styles.todoRow}>
                <View
                  style={[
                    styles.statusDot,
                    todo.completed ? styles.dotDone : styles.dotTodo,
                  ]}
                />
                <Text
                  style={[
                    styles.todoTitle,
                    todo.completed && styles.todoTitleDone,
                  ]}
                  numberOfLines={2}
                >
                  {todo.todo}
                </Text>
                <View
                  style={[
                    styles.todoBadge,
                    todo.completed
                      ? styles.todoBadgeDone
                      : styles.todoBadgeTodo,
                  ]}
                >
                  <Text
                    style={[
                      styles.todoBadgeText,
                      todo.completed
                        ? styles.todoBadgeTextDone
                        : styles.todoBadgeTextTodo,
                    ]}
                  >
                    {todo.completed ? "FAIT" : "À FAIRE"}
                  </Text>
                </View>
              </View>
            ))
          )}
        </>
      )}
    </ScrollView>
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
    paddingBottom: 40,
  },
  kicker: {
    color: "#0f766e",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
  },
  title: {
    marginTop: 4,
    marginBottom: 16,
    fontSize: 28,
    fontWeight: "800",
    color: "#1f2933",
  },
  loader: {
    marginVertical: 24,
  },
  errorText: {
    color: "#dc2626",
    fontSize: 14,
    marginTop: 8,
  },
  // User pills
  userList: {
    marginBottom: 4,
  },
  userListContent: {
    gap: 10,
    paddingVertical: 4,
  },
  userPill: {
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#ece5dc",
    backgroundColor: "#fff",
  },
  userPillSelected: {
    borderColor: "#0f766e",
    backgroundColor: "#f0fdf9",
  },
  userAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#ece5dc",
  },
  userAvatarSelected: {
    borderColor: "#0f766e",
  },
  userPillText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#52606d",
  },
  userPillTextSelected: {
    color: "#0f766e",
  },
  // Todos section
  sectionTitle: {
    marginTop: 24,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: "800",
    color: "#1f2933",
  },
  emptyText: {
    fontSize: 14,
    color: "#94a3b8",
    fontStyle: "italic",
  },
  separator: {
    height: 8,
  },
  todoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ece5dc",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    flexShrink: 0,
  },
  dotTodo: {
    backgroundColor: "#f59e0b",
  },
  dotDone: {
    backgroundColor: "#10b981",
  },
  todoTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2933",
    lineHeight: 20,
  },
  todoTitleDone: {
    textDecorationLine: "line-through",
    color: "#94a3b8",
  },
  todoBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  todoBadgeTodo: {
    backgroundColor: "#fef3c7",
  },
  todoBadgeDone: {
    backgroundColor: "#d1fae5",
  },
  todoBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.4,
  },
  todoBadgeTextTodo: {
    color: "#b45309",
  },
  todoBadgeTextDone: {
    color: "#0f766e",
  },
});
