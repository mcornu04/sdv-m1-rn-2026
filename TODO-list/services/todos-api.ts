// ── Types générés depuis https://dummyjson.com/todos ──────────────────────────
export interface DummyJsonTodo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface DummyJsonTodosResponse {
  todos: DummyJsonTodo[];
  total: number;
  skip: number;
  limit: number;
}

// ── Types utilisateurs https://dummyjson.com/users ────────────────────────────
export interface DummyJsonUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}

export interface DummyJsonUsersResponse {
  users: DummyJsonUser[];
  total: number;
  skip: number;
  limit: number;
}

const BASE_URL = "https://dummyjson.com";

// ── Helpers ───────────────────────────────────────────────────────────────────
async function apiRequest<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!response.ok) {
    throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

// ── Todos ─────────────────────────────────────────────────────────────────────
export async function fetchTodos(): Promise<DummyJsonTodo[]> {
  const data = await apiRequest<DummyJsonTodosResponse>(`/todos?limit=0`);
  return data.todos;
}

export async function fetchTodosByUser(
  userId: number,
): Promise<DummyJsonTodo[]> {
  const data = await apiRequest<DummyJsonTodosResponse>(
    `/todos/user/${userId}`,
  );
  return data.todos;
}

export async function createTodoDummy(
  title: string,
  userId: number = 1,
): Promise<DummyJsonTodo> {
  return apiRequest<DummyJsonTodo>("/todos/add", {
    method: "POST",
    body: JSON.stringify({ todo: title, completed: false, userId }),
  });
}

export async function updateTodoDummy(
  id: string,
  title: string,
  completed: boolean,
): Promise<DummyJsonTodo> {
  const numericId = id.startsWith("api-") ? id.replace("api-", "") : null;
  if (!numericId) {
    return Promise.resolve({ id: 0, todo: title, completed, userId: 1 });
  }
  return apiRequest<DummyJsonTodo>(`/todos/${numericId}`, {
    method: "PUT",
    body: JSON.stringify({ todo: title, completed }),
  });
}

export async function deleteTodoDummy(id: string): Promise<void> {
  const numericId = id.startsWith("api-") ? id.replace("api-", "") : null;
  if (!numericId) return;
  await apiRequest(`/todos/${numericId}`, { method: "DELETE" });
}

// ── Users ─────────────────────────────────────────────────────────────────────
export async function fetchUsers(limit = 10): Promise<DummyJsonUser[]> {
  const data = await apiRequest<DummyJsonUsersResponse>(
    `/users?limit=${limit}&select=id,firstName,lastName,email,image`,
  );
  return data.users;
}
