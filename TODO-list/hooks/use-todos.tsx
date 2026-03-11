import React from "react";

import { type TodoCardProps } from "@/components/todo-card";
import {
  createTodoDummy,
  deleteTodoDummy,
  fetchTodos,
  updateTodoDummy,
} from "@/services/todos-api";

type TodoItem = TodoCardProps & {
  id: string;
  description?: string;
};

type TodosContextValue = {
  todos: TodoItem[];
  isLoading: boolean;
  error: string | null;
  toggleTodoStatus: (id: string) => void;
  addTodo: (title: string, description?: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, title: string) => void;
};

const TodosContext = React.createContext<TodosContextValue | null>(null);

export function TodosProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = React.useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetchTodos()
      .then((apiTodos) => {
        const mapped: TodoItem[] = apiTodos.map((t) => ({
          id: `api-${t.id}`,
          title: t.todo,
          subtitle: t.completed ? "Fait" : "a faire",
          titleLineThrough: t.completed,
          titleItalic: t.completed,
        }));
        setTodos(mapped);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Erreur de chargement.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const toggleTodoStatus = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }

        const nextIsDone = todo.subtitle === "a faire";

        // Sync with API (fire-and-forget)
        updateTodoDummy(id, todo.title, nextIsDone).catch(() => null);

        return {
          ...todo,
          subtitle: nextIsDone ? "Fait" : "a faire",
          titleLineThrough: nextIsDone,
          titleItalic: nextIsDone,
        };
      }),
    );
  };

  const addTodo = (title: string, description?: string) => {
    const cleanTitle = title.trim();
    if (!cleanTitle) {
      return;
    }

    const cleanDescription = description?.trim();
    const tempId = `todo-${Date.now()}`;

    setTodos((prevTodos) => [
      {
        id: tempId,
        title: cleanTitle,
        description: cleanDescription,
        subtitle: "a faire",
      },
      ...prevTodos,
    ]);

    // Sync with API (fire-and-forget)
    createTodoDummy(cleanTitle).catch(() => null);
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    // Sync with API (fire-and-forget)
    deleteTodoDummy(id).catch(() => null);
  };

  const updateTodo = (id: string, title: string) => {
    const cleanTitle = title.trim();
    if (!cleanTitle) return;

    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id !== id) return todo;
        const completed = todo.subtitle === "Fait";
        // Sync with API (fire-and-forget)
        updateTodoDummy(id, cleanTitle, completed).catch(() => null);
        return { ...todo, title: cleanTitle };
      }),
    );
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        isLoading,
        error,
        toggleTodoStatus,
        addTodo,
        deleteTodo,
        updateTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
}

export function useTodos() {
  const context = React.useContext(TodosContext);

  if (!context) {
    throw new Error("useTodos must be used inside TodosProvider");
  }

  return context;
}
