import todoStore, {FilterStates} from "../../store/todo.store.js";

// the HTML element where the pending to-dos count will be displayed.
let element;

/**
 * Shows the amount to-dos that have not been done.
 * @param {string} elementId HTML element ID.
 */
export const renderPendingTodos = (elementId) => {
    if (!element) element = document.querySelector(elementId)
    if (!element) throw new Error(`Element whit id '${elementId}' not found`)

    element.innerHTML = todoStore.getTodos(FilterStates.Pending).length.toString()

}