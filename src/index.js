import { getBoardData, getAllBoards, createBoard, createNewCard, createNewLists, getLists, getAllCards, deleteCard, deleteList, deleteBoard } from "./apicalls.js"
import CustomBoard from "./customBoard.js";
import getCustomListComponent from "./customList.js";
import getCustomCardComponent from "./customcard.js";

const addNewListBtn = document.querySelector('.add-list-btn')
const createNewListBtn = document.querySelector('.create-list-btn')
const closeCreateListBtn = document.querySelector('.close-create-list-btn')


const boardsContainer = document.querySelector('.boards-container')
const homePageContainer = document.querySelector('.home-page-container');
const boardsInfoPage = document.querySelector('.boards-info-container')

let activeBoards = [];
let prevCardOption = undefined;
let prevlistOption = undefined;
let currentlySelectedBoard = null;
let prevselectedBoardOption = undefined;




function updateBoardContainerUI(boardData, isSelected) {
    const newBoard = document.createElement('li');
    newBoard.setAttribute('class', 'board')
    newBoard.setAttribute('id', boardData.id)
    if (isSelected) {
        if (currentlySelectedBoard != null) {
            currentlySelectedBoard.classList.toggle('selected')
        }
        newBoard.classList.add('selected')
        currentlySelectedBoard = newBoard;
    }
    newBoard.setAttribute('data-id', boardData.id)
    newBoard.innerHTML = CustomBoard(boardData)
    boardsContainer.append(newBoard)
    if (isSelected) {
        displayLists(boardData)
    }
}

function updateHomepageUI(boardData) {
    const newBoard = document.createElement('p');
    newBoard.setAttribute('class', 'home-page-board');
    newBoard.setAttribute('data-id', boardData.id);
    newBoard.innerText = boardData.name;
    if (boardData.prefs.backgroundImage) {
        newBoard.style.backgroundImage = `url(${boardData.prefs.backgroundImage})`
    } else {
        newBoard.style.backgroundColor = boardData.prefs.backgroundColor
    }
    newBoard.style.backgroundSize = '100% 100%'
    homePageContainer.lastElementChild.before(newBoard);
}
function updateCardContainerUI(cardData) {
    const newCard = document.createElement('li')
    newCard.setAttribute('class', 'card')
    newCard.innerHTML = getCustomCardComponent(cardData)
    document.getElementById(cardData.idList).append(newCard)
}

function updateListContainerUI(listData) {
    const newList = document.createElement('li');
    newList.setAttribute('class', 'list');
    newList.innerHTML = getCustomListComponent(listData);
    createNewListBtn.setAttribute('data-board-id', listData.idBoard)
    document.querySelector('.lists-container').append(newList);
    displaycards(listData)
}

function displayNewBoard(boardItem) {
    const boardId = boardItem.getAttribute('data-id');
    const boardData = activeBoards.find(board => board.id == boardId)
    displayLists(boardData)
}

function displaycards(listData) {
    getAllCards(listData.id)
        .then((cards) => {
            cards.forEach((card) => {
                updateCardContainerUI(card)
            })
        })
}

function displayLists(boardData) {
    document.querySelector('.lists-container').innerHTML = '';
    const mainElement = document.querySelector('main');
    if (boardData.prefs.backgroundImage) {
        mainElement.style.backgroundImage = `url(${boardData.prefs.backgroundImage})`
    } else {
        mainElement.style.backgroundImage = 'none'
        mainElement.style.backgroundColor = boardData.prefs.backgroundColor
    }
    createNewListBtn.setAttribute('data-board-id', boardData.id)
    getLists(boardData.id)
        .then((lists) => {
            lists.forEach((listData) => {
                updateListContainerUI(listData)
            })
        })
}

function deleteThisList(event) {
    deleteList(event.target.getAttribute('data-list-id'))
        .then((res) => {
            event.target.parentElement.parentElement.parentElement.style.display = 'none'
        })
}
function deleteThisCard(event) {
    deleteCard(event.target.getAttribute('data-card-id'))
        .then((res) => {
            event.target.parentElement.parentElement.style.display = 'none';
        })
}

function createBoardFormSubmitted(event, formElement, boardTitle, updateUI) {
    event.preventDefault();
    console.log('form submitted');

    // const boardTitle = event.target.lastElementChild.previousElementSibling;
    if (boardTitle.value == '' || boardTitle.value.startsWith(' ')) {
        boardTitle.previousElementSibling.classList.toggle('hidden')
    } else {
        if(!boardTitle.previousElementSibling.classList.contains('hidden')){
            boardTitle.previousElementSibling.classList.toggle('hidden')
        }
        // closeCreateBoard();
        createBoard(boardTitle.value)
            .then((boardData) => {
                activeBoards.push(boardData);
                updateUI(boardData, true)
            })
            .catch((err) => {
                console.log(err);
            })
        boardTitle.value = ''
        formElement.parentElement.classList.toggle('hidden')
    }
}
function createCardFormSubmitted(event) {
    console.log(event.target);
    const cardTitle = event.target.previousElementSibling;
    if (cardTitle.value.startsWith(' ') || cardTitle.value == '') {
        cardTitle.previousElementSibling.style.display = 'block';
    } else {
        const listId = event.target.getAttribute('data-list-id');
        console.log(cardTitle.value);
        cardTitle.previousElementSibling.style.display = 'none';

        createNewCard(cardTitle.value, listId)
            .then((cardData) => {
                updateCardContainerUI(cardData)
            })
        cardTitle.value = '';

        event.target.parentElement.classList.toggle('hidden');
        console.log(event.target.getAttribute('data-list-id'));
        event.target.parentElement.previousElementSibling.style.display = 'block';
    }
}
function createListFormSubmitted(event) {
    const listTitle = createNewListBtn.previousElementSibling;
    if (listTitle.value.startsWith(' ') || listTitle.value == '') {
        listTitle.previousElementSibling.style.display = 'block';
    } else {
        const boardId = createNewListBtn.getAttribute('data-board-id');
        console.log(listTitle.value);
        listTitle.previousElementSibling.style.display = 'none';
        createNewLists(listTitle.value, boardId)
            .then((listData) => {
                updateListContainerUI(listData)
            })
        listTitle.value = '';
        createNewListBtn.parentElement.classList.toggle('hidden');
        createNewListBtn.parentElement.previousElementSibling.style.display = 'block';
    }
}






//1

document.addEventListener("DOMContentLoaded", function () {
    getAllBoards()
        .then((res) => {
            activeBoards = res.filter((board) => !board.closed);
            console.log(activeBoards);
            activeBoards.forEach((boardData) => {
                updateHomepageUI(boardData);
            })
        })
})

//2

homePageContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('home-page-board')) {
        const selectedId = event.target.getAttribute('data-id');
        document.querySelector('.home-page').style.display = 'none'
        boardsInfoPage.classList.toggle('hidden')
        console.log(activeBoards);

        activeBoards.forEach((boardData) => {
            const isSelected = selectedId == boardData.id ? true : false;
            updateBoardContainerUI(boardData, isSelected)
        })


    }


})


//3
document.querySelector('.aside-header-part').addEventListener("click", (event) => {
    event.preventDefault()

    if (event.target.classList.contains('add-board-btn')) {
        event.target.parentElement.nextElementSibling.classList.toggle('hidden')
    } else if (event.target.classList.contains('close') || event.target.parentElement.classList.contains('close')) {
        let closeBtn = event.target.parentElement
        if (event.target.classList.contains('close')) {
            closeBtn = event.target
        }
        console.log(closeBtn);
        console.log('here now');
        closeBtn.parentElement.parentElement.classList.toggle('hidden')
    } else if (event.target.parentElement.tagName === 'FORM' && event.target.tagName == 'BUTTON') {
        const formElement = event.target.parentElement;
        const boardTitle = event.target.previousElementSibling
        createBoardFormSubmitted(event, formElement, boardTitle, updateBoardContainerUI)

    }
})

//4
boardsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('board-button')) {

        event.target.nextElementSibling.classList.toggle('hidden')
        prevselectedBoardOption = event.target.nextElementSibling;
    }
    else if (event.target.parentElement.classList.contains('board') || event.target.classList.contains('board')) {
        let boardItem = null;
        if (event.target.tagName == 'P') {
            boardItem = event.target.parentElement;
        } else {
            boardItem = event.target
        }
        currentlySelectedBoard.classList.toggle('selected')
        boardItem.classList.toggle('selected')
        currentlySelectedBoard = boardItem

        displayNewBoard(boardItem)

    }


})


//5
boardsInfoPage.addEventListener('click', (event) => {
    event.preventDefault()
    if (prevCardOption != undefined && !prevCardOption.classList.contains('hidden')) {
        prevCardOption.classList.add('hidden')
    }
    if (prevlistOption != undefined && !prevlistOption.classList.contains('hidden')) {
        prevlistOption.classList.add('hidden')
    }
    if (prevselectedBoardOption != undefined && !prevselectedBoardOption.classList.contains('hidden')) {
        prevselectedBoardOption.classList.add('hidden')
    }


    if (event.target.classList.contains('board-button')) {
        event.target.nextElementSibling.classList.toggle('hidden')
        prevselectedBoardOption = event.target.nextElementSibling;
    } else if (event.target.classList.contains('add-card-btn')) {
        event.target.style.display = "none";
        event.target.nextElementSibling.classList.toggle('hidden');
    } else if (event.target.classList.contains('close-create-card-btn')) {
        event.target.parentElement.parentElement.classList.toggle('hidden');
        event.target.parentElement.parentElement.previousElementSibling.style.display = 'block';
    } else if (event.target.classList.contains('create-card-btn')) {
        createCardFormSubmitted(event)
    } else if (event.target.classList.contains('create-list-btn')) {
        createListFormSubmitted(event)
    } else if (event.target.classList.contains('list-action-btn')) {
        event.target.parentElement.parentElement.nextElementSibling.classList.toggle('hidden')
        prevlistOption = event.target.parentElement.parentElement.nextElementSibling;
    } else if (event.target.classList.contains('close-list-action-btn')) {
        event.target.parentElement.parentElement.parentElement.classList.toggle('hidden')
    } else if (event.target.classList.contains('card-options')) {
        event.target.nextElementSibling.classList.toggle('hidden')
        prevCardOption = event.target.nextElementSibling;
    } else if (event.target.classList.contains('delete-board')) {
        const boardId = event.target.getAttribute('data-board-id')
        document.getElementById(boardId).style.display = 'none'
        deleteBoard(boardId)
    } else if (event.target.classList.contains('delete-list-btn')) {
        event.target.parentElement.parentElement.classList.toggle('hidden')
        deleteThisList(event)
    } else if (event.target.classList.contains('delete-card')) {
        console.log('delete card clicked', event.target.getAttribute('data-card-id'));
        deleteThisCard(event)
    } 
})




addNewListBtn.addEventListener('click', () => {
    addNewListBtn.style.display = 'none'
    addNewListBtn.nextElementSibling.classList.toggle('hidden');
})

closeCreateListBtn.addEventListener('click', () => {
    closeCreateListBtn.parentElement.classList.toggle('hidden');
    closeCreateListBtn.parentElement.previousElementSibling.style.display = 'block';
})

document.querySelector('.create-new-board').addEventListener('click', (event) => {

    if (event.target.classList.contains('create-new-board')) {
        event.target.lastElementChild.classList.toggle('hidden')
    } else if (event.target.classList.contains('close') || event.target.parentElement.classList.contains('close')) {
        let closeBtn = event.target.parentElement
        if (event.target.classList.contains('close')) {
            closeBtn = event.target
        }
        console.log(closeBtn);
        let warningMsgElement = closeBtn.parentElement.nextElementSibling.children[1];
        console.log(warningMsgElement);
        if(!warningMsgElement.classList.contains('hidden')){
            warningMsgElement.classList.toggle('hidden')
        }
        console.log(warningMsgElement);
        closeBtn.parentElement.parentElement.classList.toggle('hidden')
    }

})
document.querySelector('.create-board-form').addEventListener('submit', (event) => {
    const inputFieldElement = event.target.lastElementChild.previousElementSibling;
    const formElement = event.target
    createBoardFormSubmitted(event, formElement, inputFieldElement, updateHomepageUI);
})



document.querySelector('.icon').addEventListener('mouseover', (event) => {
    event.target.setAttribute('src', 'https://trello.com/assets/87e1af770a49ce8e84e3.gif');
})
document.querySelector('.icon').addEventListener('mouseleave', (event) => {
    event.target.setAttribute('src', 'https://trello.com/assets/d947df93bc055849898e.gif')
})
