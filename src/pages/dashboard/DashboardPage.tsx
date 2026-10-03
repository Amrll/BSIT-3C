import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { MESSAGES } from "../../constants/messages";
import Clock from "../../components/Clock";
import Card from "../../components/Card";

//https://jsonplaceholder.typicode.com/todos?_limit=10

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

function DashboardPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
    console.log(todos);
  }, []);

  const fetchTodos = () => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  if (error) {
    return <p className="text-red-500">{MESSAGES.error.generic}</p>;
  }

  if (loading) {
    return <p>{MESSAGES.loading.generic}</p>;
  }

  const handleReload = () => {
    setLoading(true);
    fetchTodos();
    console.log(todos);
  };

  return (
    <>
      <Clock />
      <ul>
        {todos.map((todo) => (
        //<li key={todo.id}>{todo.title}</li>
          <Card key={todo.id}>
            <h3 className="font-bold">{todo.title}</h3>
            <p>{todo.completed ? "Completed" : "In Progress"}</p>
            <Button label="Completed" onClick={() => {}} type="button" />
          </Card>
        ))}
      </ul>

      <Button label="Reload" onClick={handleReload} type="button" />
    </>
  );
}

export default DashboardPage;
