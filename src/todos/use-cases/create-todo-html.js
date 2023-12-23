/**
 * create an html element to render a to-do
 * @param {TodoModel} todo  TodoModel object, {id, description, done} are needed
 */
export const createTodoHtml = (todo) => {
    if (!todo) throw new Error(`Objet type TodoModel is expected, instead '${todo}'`)

    const html =
            `<div class="view">
                <input class="toggle" type="checkbox" ${todo.done? 'checked': ''}>
                <label>${todo.description}</label>
                <button class="destroy"></button>
             </div>
             <input class="edit" value="Create a TodoMVC template">`

    const listItem = document.createElement('li')
    listItem.innerHTML = html
    listItem.setAttribute('data-id', todo.id)
    if (todo.done) listItem.classList.add('completed')
    return listItem
}