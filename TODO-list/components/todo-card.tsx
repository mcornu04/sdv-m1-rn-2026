import React from "react";
import { StyleSheet, Text, View } from "react-native";

export type TodoStatus = "a faire" | "Fait";

export type TodoCardProps = {
  title: string;
  subtitle: TodoStatus;
  titleOpacity?: number;
  subtitleOpacity?: number;
  titleItalic?: boolean;
  titleLineThrough?: boolean;
};

export function TodoCard({
  title,
  subtitle,
  titleOpacity = 1,
  subtitleOpacity = 1,
  titleItalic = false,
  titleLineThrough = false,
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
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: "#ffffff",
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  subtitleContainer: {
    marginTop: 8,
  },
  subtitle: {
    fontSize: 14,
  },
  subtitleTodo: {
    fontWeight: "700",
    textDecorationLine: "none",
  },
  subtitleDone: {
    textDecorationLine: "none",
  },
  italic: {
    fontStyle: "italic",
  },
  lineThrough: {
    textDecorationLine: "line-through",
  },
});
