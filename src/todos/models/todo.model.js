import {v4 as uuid} from 'uuid'

/**
 * description
 */
export class TodoModel{
    /**
     * description
     * @param description
     */
    constructor(description) {
        this.id = uuid()
        this.description = description
        this.done = false
        this.created = new Date()
    }

}