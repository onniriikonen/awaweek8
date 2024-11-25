
const form = document.getElementById("todoForm")
const userInput = document.getElementById("userInput")
const todoInput = document.getElementById("todoInput")
const msg = document.getElementById("msg")
const searchForm = document.getElementById("searchForm")
const searchInput = document.getElementById("searchInput")
const todoList = document.getElementById("todoList");

form.addEventListener("submit", async event => {
    event.preventDefault();
    const user = userInput.value
    const todo = todoInput.value
    const data = await fetch("http://localhost:3000/add", {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: `{ "name": "${user}", "todo": "${todo}" }`
    })
    const message = await data.text()
    msg.textContent = message

    userInput.value = ""
    todoInput.value = ""
})

searchForm.addEventListener("submit", async event => {
    event.preventDefault();
    const name = searchInput.value
    const data = await fetch (`http://localhost:3000/todos/${name}`)
    if (data.status == 404) {
        const message = await data.text()
        msg.textContent = message
        todoList.innerText = ""
        return
    }
    const todos = await data.json()
    display(todos)
    msg.innerText = ""
})

function display(todos) {
    todoList.innerText = ""
    todos.forEach((todo) => {
        const item = document.createElement("li")
        item.textContent = todo
        todoList.appendChild(item)
    })
}