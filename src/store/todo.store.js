import {TodoModel} from "../todos/models/todo.model.js";


export const FilterStates = {
    All: 'All',
    Completed: 'Completed',
    Pending: 'Pending'
}

/**
 * state object represents a ...
 * @type {{filter: string, todos: TodoModel[]}}
 */
const state = {
    filter: FilterStates.Pending,
    todos:[
        new TodoModel('What is there to do?'),
    ]
}


const initStore = () => {
    if ( !localStorage.getItem('state')) return;
    const {todos = [], filter = FilterStates.All} = JSON.parse(localStorage.getItem('state'))
    state.todos = todos
    state.filter = filter
}


const saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state))
}


const getTodos = ( filter = FilterStates.All ) => {
    if ( filter === FilterStates.All ) return [...state.todos]
    if ( filter === FilterStates.Completed ) return state.todos.filter(todo => todo.done)
    if ( filter === FilterStates.Pending ) return state.todos.filter(todo => !todo.done)
    return `filter state '${filter}' is not valid`
}


/**
 * description
 * @param description
 */
const addTodo = ( description ) => {
    if (!description) throw new Error('addTodo Error, description is required')
    state.todos.push(new TodoModel(description))
    saveStateToLocalStorage()
}


const toggleTodo = ( todoId ) => {
    state.todos = state.todos.map(todo =>{
        if (todo.id === todoId) todo.done = !todo.done
        return todo
    })
    saveStateToLocalStorage()
}


const deleteTodo = ( todoId ) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId)
    saveStateToLocalStorage()
}


const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done)
    saveStateToLocalStorage()
}


const setFilter = ( newFilter = FilterStates.All) => {
    if (Object.keys(FilterStates).includes(newFilter)) state.filter = newFilter
    else throw new Error(`Filter '${newFilter}' is not allowed`)
    saveStateToLocalStorage()
}


const getFilter = () => {
    return state.filter
}


export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getFilter,
    getTodos,
    initStore,
    setFilter,
    toggleTodo,
}
