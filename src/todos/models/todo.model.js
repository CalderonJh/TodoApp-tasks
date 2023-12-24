import {v4 as uuid} from 'uuid'

/**
 * Class TodoModel has the attributes of a todo, such as a unique id, a description and a state (done)
 * that indicates whether the todo has been done or is pending.
 */
export class TodoModel{
    /**
     * A to-do takes a description, is assigned a unique ID,
     * and the state 'done' is false when the to-do is created.
     * @param {string} description is required to indicate what should be done.
     */
    constructor(description) {
        this.id = uuid()
        this.description = description
        this.done = false
    }

}