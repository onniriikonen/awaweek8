const form = document.getElementById("todoForm");
const userInput = document.getElementById("userInput")
const todoInput = document.getElementById("todoInput")
const msg = document.getElementById("msg")

form.addEventListener("submit", async event => {
    event.preventDefault();
    const user = userInput.value
    const todo = todoInput.value
    const data = await fetch("http://localhost:8000/add", {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: `{ "name": "${user}", "todo": "${todo}" }`
    })
    const message = await data.text();
    msg.textContent = message;

    userInput.value = "";
    todoInput.value = "";
})