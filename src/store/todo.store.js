import {TodoModel} from "../todos/models/todo.model.js";


const FilterStates = {
    All: 'all',
    Completed: 'completed',
    Pending: 'pending'
}


const state = {
    todos:[
        new TodoModel('test de todo model'),
        new TodoModel('test de todo model 2'),
        new TodoModel('test de todo model 3'),
    ],
    filter: FilterStates.All
}


const initStore = () => {
    console.log(state)
    console.log('init store test')
}


export default {
    initStore
}