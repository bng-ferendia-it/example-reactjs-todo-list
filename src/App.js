import React, {useState, useEffect} from "react";
import "./App.css";
import Form from "./components/Form";
import TodoList from "./components/TodoList";

const App = () => {
    // state
    const [inputText, setInputText] = useState("");
    const [todos, setTodos] = useState([]);
    const [status, setStatus] = useState("all");
    const [filteredTodos, setFilteredTodos] = useState([]);

    // functions and events
    /**
     * Filter todos based on their completion status
     */
    const filterHandler = () => {
        switch(status) {
            case "completed":
                setFilteredTodos(todos.filter(todo => todo.completed === true));
                break;
            case "uncompleted":
                setFilteredTodos(todos.filter(todo => todo.completed !== true));
                break;
            default:
                setFilteredTodos(todos);
                break;
        }
    }

    /**
     * Save todos to local storage
     */
    const setLocalStorageTodos = () => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    /**
     * Get todos from local storage
     */
    const getLocalStorageTodos = () => {
        if (localStorage.getItem("todos") !== null) {
            const localStorageTodos = JSON.parse(localStorage.getItem("todos"));
            setTodos(localStorageTodos);
        }
    }

    // use effect
    /**
     * Use effect only once on start to get the local storage todos if any
     */
    useEffect(() => {
        getLocalStorageTodos();
    }, []);

    /**
     * Use effect on status and todos change to filter todos and save to local storage
     */
    useEffect(() => {
        filterHandler();
        setLocalStorageTodos();
    }, [todos, status]);


    // we can use props instead of passing each one down, but this way it is easier to see exactly what you pass down
    return (
        <div className="App">
            <header>
                <h1>React JS Todo List</h1>
            </header>
            <Form
                todos={todos}
                setTodos={setTodos}
                inputText={inputText}
                setInputText={setInputText}
                setStatus={setStatus}
            />
            <TodoList todos={todos} setTodos={setTodos} filteredTodos={filteredTodos}/>
        </div>
    );
}

export default App;
