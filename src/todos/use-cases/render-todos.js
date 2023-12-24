import {createTodoHtml} from "./create-todo-html.js";


// HTML element where the todos will be displayed.
let element


/**
 * Renders a list of todos in the specified HTML element.
 * @param {string} elementId the ID of the HTML element where todos will be displayed.
 * @param {TodoModel[]}todos an array of todo items to be rendered. Default is an empty array.
 * @throws Will throw an error if the specified HTML element is not found.
 *
 */
export const renderTodos = (elementId, todos = []) => {
    if (!element) element = document.querySelector(elementId)
    if (!element) throw new Error(`Element whit element-id ${elementId} not found`)

    element.innerHTML = '';

    todos.forEach( todo =>{
        element.append(createTodoHtml(todo))
    })
}