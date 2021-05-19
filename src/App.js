import React, {useState, useEffect} from 'react';
import './App.css';
import Form from './components/Form'
import TodoList from './components/TodoList';

function App() {
  //State stuff
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, SetFilteredTodos] = useState([]);

useEffect(() => {
  getLocalTodos();
}, []);

//RUn once when app start
useEffect(() => {
  filterHandler();
  saveLocalTodos();
}, [todos, status]);

  //Functions
  const filterHandler = () => {
    switch(status){
      case 'completed':
        SetFilteredTodos(todos.filter(todos => todos.completed === true))
        break;
        case 'uncompleted':
        SetFilteredTodos(todos.filter(todos => todos.completed === false))
        break;
        default:
          SetFilteredTodos(todos);
          break;
    }
  };

  //Saving to local storage
  const saveLocalTodos = () => {
      localStorage.setItem("todos", JSON.stringify(todos));
    };

  const getLocalTodos = () => {
      if (localStorage.getItem("todos") == null) {
        localStorage.setItem("todos", JSON.stringify([]));
      } else {
        let todoLocal = JSON.parse(localStorage.getItem('todos'));
        setTodos(todoLocal);
      }
  };
   

  return (
    <div className="App">
      <header>
        <h1>What you must TO DO ?</h1>
      </header>
      <Form 
      inputText={inputText}
      todos={todos} 
      setTodos= {setTodos}
      setInputText={setInputText}
      setStatus={setStatus}
      />
      <TodoList 
      filtredTodos={filteredTodos}
      setTodos = {setTodos} 
      todos={todos}
       />
    </div>
    
  );
}

export default App;
