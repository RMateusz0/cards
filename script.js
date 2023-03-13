const computerThisTurnCardDiv = document.querySelector(".computer-this-turn-card-div")
const playerThisTurnCardDiv = document.querySelector(".player-this-turn-card-div")

const availableCards = ['2','3','4','5','6','7','8','9','10']
let computerCards = []
let playerCards = []

randomIndexOfCard = () => { return Math.floor(Math.random()*availableCards.length)}

initGame = () => {
    for (let i = 0; i < 9 ; i++) {
        computerCards.push(availableCards[randomIndexOfCard()])
    }
    for (let i = 0; i < 9; i++) {
        playerCards.push(availableCards[randomIndexOfCard()])
    }
}

setLastChildDifferentForPlayer = () => {
    let singleCardsPlayer = document.querySelectorAll(".player-card")
    singleCardsPlayer.forEach ( (singleCard) => { singleCard.style.backgroundColor="white" } )
    let lastChildCardPlayer = document.querySelector(".player-card:last-child")
    if (lastChildCardPlayer) { lastChildCardPlayer.style.backgroundColor="#f39418" } //rgb(78, 173, 119)
    setTimeout( () => {
        if (lastChildCardPlayer) { lastChildCardPlayer.style.backgroundColor="white" }
    },3000)
}
    
setLastChildDifferentForComputer = () => {
    let singleCardsComputer = document.querySelectorAll(".computer-card")
    singleCardsComputer.forEach ( (singleCard) => { singleCard.style.backgroundColor="white" } )
    let lastChildCardComputer = document.querySelector(".computer-card:last-child")
    if (lastChildCardComputer) { lastChildCardComputer.style.backgroundColor="#f39418" } //rgb(78, 173, 119)
    setTimeout( () => {
        if (lastChildCardComputer) { lastChildCardComputer.style.backgroundColor="white" }
    },3000)
}


drawAllActualCardsOnTable = () => {
    computerCards.forEach( (singleCardValue) => {
        let newCard = document.createElement("p")
        newCard.innerText=singleCardValue
        newCard.classList.add("single-card-in-game")
        newCard.classList.add("computer-card")
        document.querySelector(".computer-cards-div").appendChild(newCard)
    })
    playerCards.forEach( (singleCardValue) => {
        let newCard = document.createElement("p")
        newCard.innerText=singleCardValue
        newCard.classList.add("single-card-in-game")
        newCard.classList.add("player-card")
        document.querySelector(".player-cards-div").appendChild(newCard)
    })
}



addListeners = () => {
    let singleCards = document.querySelectorAll(".player-card")
    singleCards.forEach ( (singleCard) => { singleCard.addEventListener("click",whenCardClicked) } )
}


deleteAllDivCards = () => {
    let playersCardsActualDivsAmount = document.querySelectorAll(".player-card").length
    let computerCardsActualDivsAmount = document.querySelectorAll(".computer-card").length
        //
    let parentp = document.querySelector(".player-cards-div")
        for (let i=0 ; i < playersCardsActualDivsAmount ; i++) {
        let child = document.querySelector(".player-card")
        parentp.removeChild(child)
    }

    parentc = document.querySelector(".computer-cards-div")
    for (let i=0 ; i < computerCardsActualDivsAmount ; i++) {
        let child = document.querySelector(".computer-card")
        parentc.removeChild(child)
    }
}


computerWinsThisTurn = () => { 
    playerCards.push(availableCards[randomIndexOfCard()])
    deleteAllDivCards()
    drawAllActualCardsOnTable()
    addListeners()
    setLastChildDifferentForPlayer()
    playerThisTurnCardDiv.style.backgroundColor = "rgb(235, 48, 48)"
    computerThisTurnCardDiv.style.backgroundColor = "rgb(58, 199, 93)"
    
}
playerWinsThisTurn = () => { 
    computerCards.push(availableCards[randomIndexOfCard()])
    deleteAllDivCards()
    drawAllActualCardsOnTable()
    addListeners()
    setLastChildDifferentForComputer()
    playerThisTurnCardDiv.style.backgroundColor = "rgb(58, 199, 93)"
    computerThisTurnCardDiv.style.backgroundColor = "rgb(235, 48, 48)"
}
noWinnerThisTurn = () => { 
    playerThisTurnCardDiv.style.backgroundColor = "rgb(230, 226, 29)"
    computerThisTurnCardDiv.style.backgroundColor = "rgb(230, 226, 29)"
}



checkWhoWon = () => {
    
    let computerThisTurnCardDivNumber = parseInt(computerThisTurnCardDiv.innerText)
    let playerThisTurnCardDivNumber = parseInt(playerThisTurnCardDiv.innerText)

    //sprawdzenie warianty
    if (computerThisTurnCardDivNumber > playerThisTurnCardDivNumber) {
        computerWinsThisTurn()
        if (computerCards.length == 0) { 
            setTimeout(() => {alert("Przegrałaś/eś z komputerem!") 
            window.location.reload()},100) 
        } 
    } 
    else if (computerThisTurnCardDivNumber < playerThisTurnCardDivNumber) {
        playerWinsThisTurn()
        if (playerCards.length == 0) { 
            setTimeout(() => {alert("Wygrałaś/eś z komputerem!") 
            window.location.reload()},100)
        }
    }
    else if (computerThisTurnCardDivNumber == playerThisTurnCardDivNumber) {
        noWinnerThisTurn()

        if (playerCards.length == 0 && computerCards.length == 0) { 
            setTimeout(() => {alert("Remis z komputerem!") 
            window.location.reload()},100)
        }

        else if (computerCards.length == 0) { 
            setTimeout(() => {alert("Przegrałaś/eś z komputerem!") 
            window.location.reload()},100) 
        }

        else if (playerCards.length == 0) { 
            setTimeout(() => {alert("Wygrałaś/eś z komputerem!") 
            window.location.reload()},100)
        }


    }

    }


whenCardClicked = (event) => { 
    playerThisTurnCardDiv.innerText = event.target.innerText
    let tempCardIndex = playerCards.indexOf(event.target.innerText)
    
    playerCards.splice(tempCardIndex,1)
    //

    let computerChosenCardIndex = Math.floor(Math.random()*computerCards.length)
    computerThisTurnCardDiv.innerText = computerCards[computerChosenCardIndex]

    computerCards.splice(computerChosenCardIndex,1)
    

    playerThisTurnCardDiv.style.backgroundImage = "none"
    computerThisTurnCardDiv.style.backgroundImage = "none"
    deleteAllDivCards()
    drawAllActualCardsOnTable()
    addListeners()
    checkWhoWon()

}



initGame()
drawAllActualCardsOnTable()
addListeners()






