var ListaDeTickers = []

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


        const validação = ListaDeTickers.find(element => element === `${ticker}`)
        
        if(validação == ticker){
            alert("Item já existe")
        }
        else{
            ListaDeTickers.push(ticker)

            try {

                const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=1X2LY3U30H7E6ZKG`) //faz a requisição na api
                const data = await response.json() //transforma a resposta JSON em objeto
                console.log(ticker)
                console.log(data)
        
                ticker.toUpperCase()
        
                
        
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
                            <button class="btn__close" onclick="removeTicker(event)">x</button>
                            <button class="btn__refresh" onclick="refreshTicker('${ticker}')">🔄</button>
                            <h2>${ticker}</h2>
                            <p class="${priceChange}">${symbol}US $${priceFomated}</p>
                        </div>`
        
                    const tickerList = document.querySelector("#ticker__list")
        
                    tickerList.innerHTML = newTicker + tickerList.innerHTML//adicionando no HTML a nova DIV criada 
                    addTickerCloseEvent()
                    closeModal('#add-stock')
                } else {
                    alert(`Ticker ${ticker} não encontrado!`)
                }
        
            } catch (error) {
                alert(error)
            }
        }
        
    
}

const handleTickerMouseEnter = (event) => { // função para identificar se o mouse esta dentro da div e aparecer o "X"
    const ticker = event.target
    const btnClose = ticker.querySelector(".btn__close")
    const btnRefresh = ticker.querySelector(".btn__refresh")

    btnClose.style.display = "block"
    btnRefresh.style.display = "block"
}

const handleTickerMouseLeave = (event) => { //função para identificar se o mouse esta fora da div e desaparecer o "X"
    const ticker = event.target
    const btnClose = ticker.querySelector(".btn__close")
    const btnRefresh = ticker.querySelector(".btn__refresh")

    btnClose.style.display = "none"
    btnRefresh.style.display = "none"
}

const modal = document.querySelector(".modal")
modal.addEventListener("click", handleModal) // adicionando uma ação com addEventListener


const addTickerCloseEvent = () => {
    const tickers = document.querySelectorAll(".ticker")
    tickers.forEach((ticker) => {
        ticker.addEventListener("mouseenter", handleTickerMouseEnter)
        ticker.addEventListener("mouseleave", handleTickerMouseLeave)
    })
}

const removeTicker = (event) =>{ //remover div das empresas 
    const btnClose = event.target

    const ListaDeTickers__novo = []

    const ticker = btnClose.closest('.ticker') // Função closest() faz uma busca pelos elementos que estão acima do parametro, no caso o botao(btnClose) que estão nos .ticker

    const nameTicker = ticker.querySelector('h2').innerHTML
    console.log(nameTicker)

    console.log(ListaDeTickers)

    ListaDeTickers.forEach((item) => {
        if (!ListaDeTickers__novo.includes(item)){
            ListaDeTickers__novo.push(item);
        }
    })

    ListaDeTickers = ListaDeTickers__novo;

    console.log(ListaDeTickers)


    ticker.remove()

   
    
}

addTickerCloseEvent()

const refreshTicker = (event) =>{
    const btnRefresh = event.target

    


}

