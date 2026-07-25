import { useEffect, useState } from 'react'
import useLocalStorage from './localStorage'

interface Todo{
  id: number;
  text: string;
  completed: Boolean;
}

function App() {
  
  // input flag is to check if user clikced the Add button with blank and " " in the input box. 
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(
    () =>
    {
      fetch('http://localhost:3001/tasks')
      .then((res) => res.json())
      .then((data:Todo[]) => {
        setTodos(data);
        setLoading(false);}
  ).catch(
    (err) => {
      setError("No DB Server")
      setLoading(false);
    }
  )
}
  ,[]
  );

  function addTodo()
  {
    if (!input.trim()) return;
    setTodos([...todos, {text :input, id :Date.now(), completed :false}]);
    setInput('');
  }

  if(loading) return <p>loading .... </p>
  return (
    <div>
      <h1> Task Manager </h1>
      <input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && addTodo()}
      placeholder='New Task'
      />
      <button onClick={addTodo}>
        Add 
      </button>

      <ul>
        { todos.map(
          (todo:Todo) => (
            <li key= {todo.id}>
            {todo.text} ---- {todo.completed === false && 'Not Completed'}
          </li>
          )
        )
      }

      </ul>

    </div>


  );
}

export default App
