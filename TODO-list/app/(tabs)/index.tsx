import React from "react";
import { StyleSheet, View } from "react-native";

import { TodoCard, type TodoCardProps } from "@/components/todo-card";

const initialTodos: TodoCardProps[] = [
  {
    title: "Apprendre React Native",
    subtitle: "Fait",
    titleLineThrough: true,
    subtitleOpacity: 0.75,
    titleItalic: true,
  },
  {
    title: "Faire les exercices Expo Router",
    subtitle: "a faire",
  },
  {
    title: "Comprendre useState",
    subtitle: "a faire",
    titleOpacity: 0.9,
    subtitleOpacity: 0.7,
  },
  {
    title: "Creer un composant reutilisable",
    subtitle: "Fait",
    titleLineThrough: true,
  },
  {
    title: "Publier le projet",
    subtitle: "a faire",
    titleOpacity: 0.8,
  },
];

export default function HomeScreen() {
  const [todos, setTodos] = React.useState(initialTodos);

  const toggleTodoStatus = (index: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo, todoIndex) =>
        todoIndex === index
          ? (() => {
              const nextIsDone = todo.subtitle === "a faire";

              return {
                ...todo,
                subtitle: nextIsDone ? "Fait" : "a faire",
                titleLineThrough: nextIsDone,
                titleItalic: nextIsDone,
              };
            })()
          : todo,
      ),
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        {todos.map((todo, index) => (
          <React.Fragment key={`${todo.title}-${index}`}>
            <TodoCard
              title={todo.title}
              subtitle={todo.subtitle}
              titleOpacity={todo.titleOpacity}
              subtitleOpacity={todo.subtitleOpacity}
              titleItalic={todo.titleItalic}
              titleLineThrough={todo.titleLineThrough}
              onPress={() => toggleTodoStatus(index)}
            />
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 12,
  },
  list: {
    gap: 10,
  },
});
