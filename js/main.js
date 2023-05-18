const openModal = (idModal) => { // função para abrir o modal
    const divModal = document.querySelector(idModal)
    divModal.style.display = "flex"
}


const handleModal = (event, idModal) => { //função para fechar o modal pelo background
    if (event.target.className === "modal") {
        event.target.style.display = "none" //target é o elemento clicado
    }
}

const closeModal = (event, idModal) => { //função para fechar o modal pelo  o botão X
    if (idModal) {
        const divModal = document.querySelector(idModal)
        divModal.style.display = "none"
    }
}

const handleAddTicker = async (event) => {
    event.preventDefault() // impede q o form seja enviado
    const ticker = event.target.ticker.value
    try {
        console.log(event.target.ticker.value)
        const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=1X2LY3U30H7E6ZKG`) //faz a requisição na api
        const data = await response.json() //transforma a resposta JSON em objeto
        console.log(data)

        const price = data["Global Quote"]["05. price"] //pegando o preço da cotação 
        const previusClosePrice = data["Global Quote"]["08. previous close"]
        let priceChange = ''
        let symbol = ''

        if (price && previusClosePrice) {
            const priceFomated = parseFloat(price).toFixed(2)
            const previusClosePriceFormated = parseFloat(previusClosePrice).toFixed(2)

            if (priceFomated !== previusClosePriceFormated) {
                if (priceFomated > previusClosePriceFormated) {
                    priceChange = 'increase'
                    symbol = '⬆'
                } else {
                    priceChange = 'decrease'
                    symbol = '⬇'
                }
            }

            const newTicker =
                `<div class="ticker">
                <h2>${ticker}</h2>
                <p class="${priceChange}">${symbol}U$${priceFomated}</p>
            </div>`

            const tickerList = document.querySelector("#ticker__list")

            tickerList.innerHTML = newTicker + tickerList.innerHTML//adicionando no HTML a nova DIV criada 

            closeModal('#add-stock')
        } else {
            alert(`Ticker ${ticker} não encontrado!`)
        }

    } catch (error) {
        alert(error)
    }
}

const handleTickerMouseEnter = (event) => {
    const ticker = event.target
    const btnClose = ticker.querySelector(".btn__close")
    btnClose.style.display = "block"
}

const handleTickerMouseLeave = (event) => {
    const ticker = event.target
    const btnClose = ticker.querySelector(".btn__close")
    btnClose.style.display = "none"
}

const modal = document.querySelector(".modal")
modal.addEventListener("click", handleModal) // adicionando uma ação com addEventListener


const tickers = document.querySelectorAll(".ticker")

tickers.forEach((ticker) => {
    ticker.addEventListener("mouseenter", handleTickerMouseEnter)
    ticker.addEventListener("mouseleave", handleTickerMouseLeave)
})
