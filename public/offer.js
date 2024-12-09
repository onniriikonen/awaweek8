
const form = document.getElementById("offerForm")
const offersContainer = document.getElementById("offersContainer")

async function displayOffers() {
    try {
        const response = await fetch("http://localhost:3000/offers")
        if (!response.ok) {
            throw new Error("Failed to fetch offers")
        }

        const offers = await response.json()
        offersContainer.innerText = ""

        offers.forEach((offer) => {
            const offerDiv = document.createElement("div")
            offerDiv.classList.add("offerDiv")

            if (offer.image) {
                const img = document.createElement("img")
                img.src = offer.image
                img.alt = offer.title
                offerDiv.appendChild(img)
            }

            const title = document.createElement("p")
            title.textContent = `Title: ${offer.title}`
            offerDiv.appendChild(title)

            const description = document.createElement("p")
            description.textContent = `Description: ${offer.description}`
            offerDiv.appendChild(description)

            const price = document.createElement("p")
            price.textContent = `Price: ${offer.price}e`
            offerDiv.appendChild(price)

            offersContainer.appendChild(offerDiv)
        })
    } catch (error) {
        console.error("Error:", error)
    }
}

displayOffers()


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

        displayOffers()

    } catch (error) {
        console.log("Error", error)
    }
})