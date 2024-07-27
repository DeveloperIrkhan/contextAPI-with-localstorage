import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './Context'
import TodoForm from './Components/TodoForm';
import TodoItems from './Components/TodoItems';

function App() {
  const [todos, setTodots] = useState([]);
  //now we will add todos to array but will add at the start of the array
  const addTodo = (todo) => {
    setTodots((prevtodos) => [{ id: Date.now(), ...todo }, prevtodos])
  }
  const deleteTodo = (id) => {
    setTodots((prevTodo) => prevTodo.filter((todo) => todo.id != id))
  }
  const toggleComplete = (id) => {
    setTodots((prev) => prev.map((prevTodo) => prevTodo === id ?
      { ...prevTodo, toggleComplete: !prevTodo.toggleComplete } : prevTodo))
  }

  const updateTodo = (id, todo) => {
    setTodots((prevtodos) => prevtodos.map((prevTodo) => (
      prevtodos.id === id ? todo : prevtodos
    )))
  }
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if (todos && todos.length > 0) {
      setTodots(todos)
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos]);


  return (
    <TodoProvider value={{ todos, addTodo, deleteTodo, toggleComplete, updateTodo }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItems todo={todos} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
