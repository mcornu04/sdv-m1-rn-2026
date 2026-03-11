import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type TodoStatus = "a faire" | "Fait";

export type TodoCardProps = {
  title: string;
  subtitle: TodoStatus;
  titleOpacity?: number;
  subtitleOpacity?: number;
  titleItalic?: boolean;
  titleLineThrough?: boolean;
  onPress?: () => void;
  onDelete?: () => void;
  onNavigate?: () => void;
};

export function TodoCard({
  title,
  subtitle,
  titleOpacity = 1,
  subtitleOpacity = 1,
  titleItalic = false,
  titleLineThrough = false,
  onPress,
  onDelete,
  onNavigate,
}: TodoCardProps) {
  const isDone = subtitle === "Fait";
  const isTodo = subtitle === "a faire";

  const resolvedTitleLineThrough = titleLineThrough || isDone;
  const resolvedTitleItalic = titleItalic || isDone;

  const resolvedTitleOpacity = resolvedTitleLineThrough
    ? Math.min(titleOpacity, 0.5)
    : titleOpacity;

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Pressable
          onPress={onPress}
          style={({ pressed }) => [
            styles.mainPressable,
            pressed && styles.cardPressed,
          ]}
        >
          <Text
            style={[
              styles.title,
              { opacity: resolvedTitleOpacity },
              resolvedTitleItalic && styles.italic,
              resolvedTitleLineThrough && styles.lineThrough,
            ]}
          >
            {title}
          </Text>

          <View style={styles.subtitleContainer}>
            <Text
              style={[
                styles.subtitle,
                { opacity: subtitleOpacity },
                isDone && styles.subtitleDone,
                isTodo && styles.subtitleTodo,
              ]}
            >
              {subtitle}
            </Text>
          </View>
        </Pressable>

        <Pressable
          onPress={onNavigate}
          style={({ pressed }) => [
            styles.iconButton,
            pressed && styles.iconButtonPressed,
          ]}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Voir le detail"
        >
          <Ionicons name="chevron-forward" size={20} color="#0f766e" />
        </Pressable>

        <Pressable
          onPress={onDelete}
          style={({ pressed }) => [
            styles.deleteButton,
            pressed && styles.deleteButtonPressed,
          ]}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Supprimer la tache"
        >
          <Ionicons name="trash-outline" size={20} color="#dc2626" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ece5dc",
    padding: 18,
    shadowColor: "#7f5f3f",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  mainPressable: {
    flex: 1,
  },
  cardPressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.92,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e6f4f1",
    borderWidth: 1,
    borderColor: "#99d6cc",
  },
  iconButtonPressed: {
    opacity: 0.7,
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fee2e2",
    borderWidth: 1,
    borderColor: "#fecaca",
  },
  deleteButtonPressed: {
    opacity: 0.7,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2933",
  },
  subtitleContainer: {
    marginTop: 12,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: "#f7f4ef",
  },
  subtitle: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  subtitleTodo: {
    fontWeight: "800",
    color: "#b45309",
  },
  subtitleDone: {
    fontWeight: "800",
    color: "#0f766e",
  },
  italic: {
    fontStyle: "italic",
  },
  lineThrough: {
    textDecorationLine: "line-through",
  },
});
