import TodoCard from "@/components/TodoCard";
import { StyleSheet, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <TodoCard title="Apprendre React" completed />
      <TodoCard title="Apprendre React Native" />
      <TodoCard title="Apprendre l'AIDD" />
      <TodoCard title="Apprendre l'Anglais" completed />
      <TodoCard title="Apprendre le Japonais" />
    </View>
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
});
