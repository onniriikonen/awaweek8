
const form = document.getElementById("offerForm")
const titleInput = document.getElementById("title")
const descInput = document.getElementById("description")
const priceInput = document.getElementById("price")
const imageInput = document.getElementById("image")


form.addEventListener("submit", async event => {
    event.preventDefault();
    const title = titleInput.value
    const price = priceInput.value
    const desc = descInput.value
    const data = await fetch("http://localhost:3000/upload", {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: `{ "title": "${title}", "price": "${price}", "description": "${desc}" }`
    })
    if (data.ok) {
        console.log("ok")
    }

    titleInput.value = ""
    priceInput.value = ""
    descInput.value = ""
})