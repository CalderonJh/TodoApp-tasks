import todoStore, {FilterStates} from "../../store/todo.store.js";


let element;

export const renderPendingTodos = (elementId) => {
    if (!element) element = document.querySelector(elementId)
    if (!element) throw new Error(`Element whit id '${elementId}' not found`)

    element.innerHTML = todoStore.getTodos(FilterStates.Pending).length

}