import {createTodoHtml} from "./create-todo-html.js";

let element

export const renderTodos = (elementId, todos = []) => {

    if (!element) element = document.querySelector(elementId)
    if (!element) throw new Error(`Element whit element-id ${elementId} not found`)

    todos.forEach( todo =>{
        element.append(createTodoHtml(todo))
    })
}