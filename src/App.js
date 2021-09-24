import './App.css';
import { useState,useEffect,useRef } from 'react';
import SideBar from './components/sideBar/SideBar'
import 'semantic-ui-css/semantic.min.css';
const { v4: uuidv4 } = require('uuid');

function App() {
  const List = () => {
    const [data,setData] = useState(null);
    const [todos,setTodos] = useState([]);
    const [text,setText] = useState([]);
    const todoRef = useRef();
    
    const URI = 'https://mern-to-do-list-jn.herokuapp.com/todos';
    const fetchTodos = async () => {
      await fetch(URI)
                    .then(res => res.json())
                    .then(data => setTodos(data));
    };
    
    //mdn fetch guide https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    const addTodo = async (e) => {
      e.preventDefault();
      let newTodo = { "desc": text, "id": uuidv4() };
      let tasks = [...todos, newTodo];
      await fetch(URI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tasks)
      });
      setData(tasks);
      // data clean
      fetchTodos();
      setText('');
    };

    useEffect(() => {
        fetchTodos();
      }, []);

      
      const todoClean = todos.filter(x => !!x);
      console.log(todoClean);
      const items = todoClean.map((todo) => 
          <Item todo={todo} key={todo.id} fetchTodos={fetchTodos}/>);
    
      return (
        <>
          <SideBar/>
          <div className= "main">
            <section className="header">
              <h1 className="headerTitle">Tâches du jour</h1>
              <form className="headerForm" onSubmit={addTodo}>
                <input className="headerInput" 
                  input="text" 
                  placeholder="Ajouter une nouvelle tâche"
                  value={text || ''} onChange={(e) => setText(e.target.value)}
                  ref = {todoRef} 
                  required/>
                <button className="headerButton" >
                  Ajouter <i className="plus icon"></i>
                </button>
              </form>
            </section>
            <section className="body">
              {items}
            </section>
          </div>
        </>
      );

    };

    const Item = (props) => {
      const { desc, id } = props.todo;

    const deleteTodo = async() => {
          await fetch(`https://mern-to-do-list-jn.herokuapp.com/todos/${id}`, 
          {method: 'DELETE'}).then(() => console.log(id));

        props.fetchTodos();
    };
      
    return (
      <div className="item">
          <h3 className="itemTitle">{desc}</h3>
          <button className="itemButton" onClick={deleteTodo}>
            <i className="itemIcon trash icon" ></i>
          </button>
      </div>
      );
    };

    return (
      <div className="App">
        <List />
      </div>
    );
};

export default App;
