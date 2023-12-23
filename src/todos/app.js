import html from './app.html?raw'
import TodoStore, {FilterStates} from "../store/todo.store.js";
import todoStore from "../store/todo.store.js";
import {renderPendingTodos, renderTodos,} from "./use-cases/index.js";


const ElementIDs ={
    TodoList: '.todo-list',
    newTodoInput: '#new-todo-input',
    ButtonClearCompleted: '.clear-completed',
    TodosFilters: '.filter',
    PendingCountLabel: '#pending-count'
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
        updatePendingTodos()
    }

    const updatePendingTodos = () => {
        renderPendingTodos(ElementIDs.PendingCountLabel)
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

    // HTML references
    const newDescriptionInput = document.querySelector(ElementIDs.newTodoInput)
    const todosListUl = document.querySelector(ElementIDs.TodoList)
    const buttonClearCompleted = document.querySelector(ElementIDs.ButtonClearCompleted)
    const filtersListItems = document.querySelectorAll(ElementIDs.TodosFilters)


    // events
    newDescriptionInput.addEventListener('keyup', (event) => {
        if(event.key !== 'Enter') return;
        if (event.target.value.trim().length === 0) return;

        todoStore.addTodo(event.target.value);
        event.target.value = ''
        displayTodos()
    })

    todosListUl.addEventListener('click', (event)=>{
        const parent = event.target.closest('[data-id]')
        todoStore.toggleTodo(parent.getAttribute('data-id'))
        displayTodos()
    })

    todosListUl.addEventListener('click', (event)=>{
        if (event.target.className === 'destroy'){
            const parent = event.target.closest('[data-id]')
            todoStore.deleteTodo(parent.getAttribute('data-id'))
            displayTodos()
        }
    })

    buttonClearCompleted.addEventListener('click', ()=>{
        todoStore.deleteCompleted()
        displayTodos()
    })

    filtersListItems.forEach(filter =>{
        filter.addEventListener('click', (filter)=>{
            filtersListItems.forEach(element => {
                element.classList.remove('selected')
            })
            filter.target.classList.add('selected')
            if (filter.target.id === 'all-filter') todoStore.setFilter(FilterStates.All)
            else if (filter.target.id === 'completed-filter') todoStore.setFilter(FilterStates.Completed)
            else if (filter.target.id === 'pending-filter') todoStore.setFilter(FilterStates.Pending)
            displayTodos()
        })

    })

}