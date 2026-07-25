import { useEffect, useReducer, useState } from 'react'

interface Todo{
  id: number;
  text: string;
  completed: boolean;
}

type Action = 
      | { type : 'ADD_TODOS', payload : Todo[]}
      | { type : 'GET_TODOS', payload : Todo}
      | { type : 'DELETE_TODOS', payload : number}
      | { type : 'TOGGLE_TODOS', payload : number}

function todoreducer( state:Todo[], action:Action): Todo[] {
  switch(action.type)
  {
    case 'ADD_TODOS':
      return action.payload;
    case 'GET_TODOS':
      return [...state, action.payload];
    case 'DELETE_TODOS':
      return state.filter(
        (todo) => todo.id !== action.payload
      );
    case 'TOGGLE_TODOS':
      return state.map(
        (todo) => todo.id === action.payload ? {
          ...todo, completed: !todo.completed
        } :todo
      );
      default:
        return state; 
  }

}

function App() {
  
  // input flag is to check if user clikced the Add button with blank and " " in the input box. 
  const [input, setInput] = useState('');
  const [todos, dispatch] = useReducer(todoreducer, []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(
    () =>
    {
      fetch('http://localhost:3001/tasks')
      .then((res) => res.json())
      .then((data:Todo[]) => {
        dispatch({ type: 'ADD_TODOS', payload: data })
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
    dispatch({ type: 'GET_TODOS', payload: { text:input, id: Date.now(), completed: false }});
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
