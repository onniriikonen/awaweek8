

const form = document.getElementById("offerForm")


form.addEventListener("submit", async event => {
    event.preventDefault();
    const formData = new FormData(event.target)
    try {
        const data = await fetch("http://localhost:3000/upload", {
            method: "post",
            body: formData
        })
        if (!data.ok) {
            throw new Error("failed")
        }
        const responseData = await data.json()
        console.log(responseData.message);

        form.reset();

    } catch (error) {
        console.log("Error", error)
    }
})