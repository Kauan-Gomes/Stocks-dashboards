const openModal = (idModal) => {
    const divModal = document.querySelector(idModal)
    divModal.style.display = "flex"
}


const handleModal = (event, idModal) => {
    if (event.target.className === "modal") {
        event.target.style.display = "none" //target é o elemento clicado
    }
}

const closeModal = (event, idModal) => {
    if (idModal) {
        const divModal = document.querySelector(idModal)
        divModal.style.display = "none"
    }
}

const modal = document.querySelector(".modal")
modal.addEventListener("click", handleModal)


const handleAddTicker = async (event) => {
    event.preventDefault() // impede q o form seja enviado
    const ticker = event.target.ticker.value
    try {
        console.log(event.target.ticker.value)
        const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=1X2LY3U30H7E6ZKG`) //faz a requisição na api
        const data = await response.json() //transforma a resposta JSON em objeto
        console.log(data)

        if (data["Global Quote"]["05. price"]) {
            alert('Deu certo')
        } else {
            alert(`Ticker ${ticker} não encontrado!`)
        }

    } catch (error) {
        alert(error)
    }
}