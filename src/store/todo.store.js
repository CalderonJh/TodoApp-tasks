import {TodoModel} from "../todos/models/todo.model.js";


const FilterStates = {
    All: 'all',
    Completed: 'completed',
    Pending: 'pending'
}

/**
 * state object represents a ...
 * @type {{filter: string, todos: TodoModel[]}}
 */
const state = {
    filter: FilterStates.All,
    todos:[
        new TodoModel('test de todo model'),
        new TodoModel('test de todo model 2'),
        new TodoModel('test de todo model 3'),
    ]
}


const initStore = () => {
    console.log('init store test 👌, state log', state)
}


const loadStore = () => {
    throw new Error('loadStore is not implemented yet')
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
}


const toggleTodo = ( todoId ) => {
    state.todos = state.todos.map(todo =>{
        if (todo.id === todoId) todo.done = !todo.done
        return todo
    })
}


const deleteTodo = ( todoId ) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId)
}


const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => todo.done)
}


const setFilter = ( newFilter = FilterStates.All) => {
    if (Object.keys(FilterStates).includes(newFilter)) state.filter = newFilter
    else throw new Error(`Filter '${newFilter}' is not allowed`)
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
    loadStore,
    setFilter,
    toggleTodo
}
