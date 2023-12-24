import {TodoModel} from "../todos/models/todo.model.js";


/** Contains the posible states for a filter that is used to display the respective to-do category. */
export const FilterStates = {
    All: 'All',
    Completed: 'Completed',
    Pending: 'Pending'
}

/**
 * State object represents the current app state.
 * @type {{filter: string, todos: TodoModel[]}}
 * The "filter" is the current filtering state, which is 'All' by default.<br>
 * The "todos" array is the list of to-dos that have been created.
 */
const state = {
    filter: FilterStates.All,
    todos:[
        new TodoModel('What is there to do?'),
    ]
}

/**
 * Initializes app status based on data stored in localStorage,
 * keeping the default state if there aren't data available.
 * */
const initStore = () => {
    if ( !localStorage.getItem('state')) return;
    const {todos = [], filter = FilterStates.All} = JSON.parse(localStorage.getItem('state'))
    state.todos = todos
    state.filter = filter
}

/** Saves the current state to localStorage, allowing data to persist between sessions. */
const saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state))
}

/**
 * Returns an array of todo's given filter state or a string if the given state is not valid.
 * @param {string} filter the state a todo must have to be returned.
 * @returns {TodoModel[]|string} array with the todo's that have the given state.
 */
const getTodos = ( filter = FilterStates.All ) => {
    if ( filter === FilterStates.All ) return [...state.todos]
    if ( filter === FilterStates.Completed ) return state.todos.filter(todo => todo.done)
    if ( filter === FilterStates.Pending ) return state.todos.filter(todo => !todo.done)
    return `filter state '${filter}' is not valid`
}


/**
 * Adds a todo to the array and saves the data to localStorage.<br>
 * Throws an error if the description is not given.
 * @param {string} description required to create a TodoModel instance.
 */
const addTodo = ( description ) => {
    if (!description) throw new Error('addTodo Error, description is required')
    state.todos.push(new TodoModel(description))
    saveStateToLocalStorage()
}

/**
 * Switch the 'done' attribute of the 'todo' to completed or incomplete.
 * @param {string} todoId the id of the todo to be changed.
 */
const toggleTodo = ( todoId ) => {
    state.todos = state.todos.map(todo =>{
        if (todo.id === todoId) todo.done = !todo.done
        return todo
    })
    saveStateToLocalStorage()
}

/**
 * Removes a todo from the list and saves the state to localStorage.
 * @param {string} todoId id of the todo to be removed.
 */
const deleteTodo = ( todoId ) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId)
    saveStateToLocalStorage()
}

/** Removes all todos from the list that has the 'done' attribute as true. */
const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done)
    saveStateToLocalStorage()
}

/**
 * Sets the state of the filter applied to display the todo's list.<br>
 * If the new filter is not given sets 'All' by default.
 * @param {string} newFilter filter to apply, example: 'All', 'Pending', 'Completed'.
 */
const setFilter = ( newFilter = FilterStates.All) => {
    if (Object.keys(FilterStates).includes(newFilter)) state.filter = newFilter
    else throw new Error(`Filter '${newFilter}' is not allowed`)
    saveStateToLocalStorage()
}

/**
 * Gets the current state of the filter.
 * @returns {string} the state fo the filter applied, can be 'All', 'Completed' or 'Pending'.
 */
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
