import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface TodoCardProps {
  title: string;
  completed?: boolean;
}

export default function TodoCard({ title, completed }: TodoCardProps) {
  const [isCompleted, setIsCompleted] = useState(completed);
  return (
    <Pressable onPress={() => setIsCompleted(!isCompleted)}>
      <View style={[styles.card, isCompleted ? styles.cardDone : undefined]}>
        <Text
          style={[
            styles.paragraph,
            isCompleted ? styles.paragraphDone : undefined,
          ]}
        >
          {title}
        </Text>
        <Text>{isCompleted ? "Fait" : "A faire"}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
    gap: 32,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 24,
    gap: 16,
  },
  paragraph: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardDone: {
    opacity: 0.6,
  },
  paragraphDone: {
    textDecorationLine: "line-through",
    fontStyle: "italic",
  },
});
