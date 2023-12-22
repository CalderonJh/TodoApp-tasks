import html from './app.html?raw'

/**
 * description
 * @param elementId
 * @constructor
 */
export const App = (elementId) => {
    // runs when the App function is called
    (()=>
        {
            const app = document.createElement('div')
            app.innerHTML = html
            document.querySelector(elementId).append(app)
        }
    )();
}