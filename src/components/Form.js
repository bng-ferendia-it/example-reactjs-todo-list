import React, { useState } from 'react';

const Form = ({inputText, setInputText, todos, setTodos, setStatus}) => {
    const [errors, setErrors] = useState([]);

    /**
     * Update the input text on typing
     * @param event
     */
    const inputTextHandler = (event) => {
        setInputText(event.target.value);
    }

    /**
     * Validates the input text field
     * @returns {boolean}
     */
    const handleValidation = () => {
        let validationErrors = {};
        let formIsValid = true;

        //Name
        if(!inputText){
            formIsValid = false;
            validationErrors["todo"] = "Cannot be empty";
        }

        setErrors(validationErrors);
        return formIsValid;
    }

    /**
     *  Add input text todo to the list of todos
     * @param event
     */
    const submitTodoHandler = (event) => {
        event.preventDefault();
        if (handleValidation()) {
            setTodos([
                ...todos,
                {text: inputText, completed: false, id: Math.random() * Date.now()}
            ]);
            setInputText('');
        }
    }

    /**
     * Set the filter status of the todos
     * @param event
     */
    const statusHandler = (event) => {
        setStatus(event.target.value);
    }

    return (
        <form>
            <input value={inputText}
                   placeholder={errors["todo"] ? "may not be empty" : "add todo here"}
                   onChange={inputTextHandler}
                   type="text"
                   className={errors["todo"] ? "error" : ""}
            />
            <button onClick={submitTodoHandler} className="todo-button" type="submit">
                <i className="fas fa-plus-square"></i>
            </button>
            <div className="select">
                <select onChange={statusHandler} name="todos" className="filter-todo">
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Uncompleted</option>
                </select>
            </div>
        </form>
    );
}

export default Form;