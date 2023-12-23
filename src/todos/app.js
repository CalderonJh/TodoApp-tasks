import html from './app.html?raw'
import TodoStore from "../store/todo.store.js";
import todoStore from "../store/todo.store.js";
import {renderTodos} from "./use-cases/index.js";


const ElementIDs ={
    TodoList: '.todo-list'
}

/**
 * initializes a TODO application within a specified HTML element
 * @param elementId  The HTML element ID where the TODO application should be appended.
 * @constructor
 */
export const App = (elementId) => {

    const displayTodos = () => {
        const todos = TodoStore.getTodos(todoStore.getFilter())
        renderTodos(ElementIDs.TodoList, todos)
    }

    // runs automatically when the App function is called
    (()=>
        {
            const app = document.createElement('div')
            app.innerHTML = html
            document.querySelector(elementId).append(app)
            displayTodos()
        }
    )();
}