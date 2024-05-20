const apiKey = '25ebf0090cc5ced7129348c91b1debb6'
const apiToken = 'ATTAdfee9f157613f2f97c8d114f8089cffbdbcc178c2b689aa4a20604cdb6f337c37B234716'




function getAllBoards() {
    const idmember = `662f839457ed2c1455102948`
    return fetch(`https://api.trello.com/1/members/${idmember}/boards?key=${apiKey}&token=${apiToken}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
}

function getBoardData(id){
    return fetch(`https://api.trello.com/1/boards/${id}?key=${apiKey}&token=${apiToken}`)
  .then(response => {
    return response.json();
  })
}

function createBoard(boardName) {
    let urlPath = `https://api.trello.com/1/boards/?name=${boardName}&key=${apiKey}&token=${apiToken}`
    return fetch(urlPath, {
        method: "POST"
    })
        .then((res) => {
            return res.json()
        })
}

function createNewCard(name, listId) {
    const url = `https://api.trello.com/1/cards?name=${name}&idList=${listId}&key=${apiKey}&token=${apiToken}`

    return fetch(url, { method: 'POST' })
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            console.log(err);
        })
}


function createNewLists(name, boardId) {

    return fetch(`https://api.trello.com/1/lists?name=${name}&idBoard=${boardId}&key=${apiKey}&token=${apiToken}`, {
        method: 'POST'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.error(err));

}

function getLists(boardId) {

    const url = `https://api.trello.com/1/boards/${boardId}/lists?key=${apiKey}&token=${apiToken}`;
    return fetch(url, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
}

function getAllCards(listID) {
    const url = `https://api.trello.com/1/lists/${listID}/cards?key=${apiKey}&token=${apiToken}`;

    return fetch(url, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
}

function deleteCard(id) {
    return fetch(`https://api.trello.com/1/cards/${id}?key=${apiKey}&token=${apiToken}`, {
        method: 'DELETE'
    })
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            console.log(err);
        })
}
function deleteList(id) {
    const url = `https://api.trello.com/1/lists/${id}/closed?key=${apiKey}&token=${apiToken}&value=true`;

    return fetch(url, {
        method: 'PUT'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.error(err));

}
function deleteBoard(id) {
    return fetch(`https://api.trello.com/1/boards/${id}?key=${apiKey}&token=${apiToken}`, {
        method: 'DELETE'
    })
    .then(response => {
        return response.json();
    })
}

export { getBoardData, getAllBoards, createBoard, createNewCard, createNewLists, getLists, getAllCards, deleteCard, deleteList, deleteBoard }