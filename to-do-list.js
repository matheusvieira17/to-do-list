'use strict';

function createItem (task, status, position) {
    const item = document.createElement("label") 
    item.classList.add("item")
    item.innerHTML = `
        <input type="checkbox" ${status} data-position = ${position}>
        <div> ${task} </div>
        <input type="button" value="X" data-position = ${position}>
    `
    const list = document.querySelector(".list-item")
    list.appendChild(item)
}

function getToDatabase () {
    return JSON.parse(localStorage.getItem("todoList")) ?? []
}

function setToDatabase (database) {
    return localStorage.setItem ("todoList", JSON.stringify(database))
}

function connectScreenWithDatabase () {
    cleanTasks()
    const database = getToDatabase()
    database.forEach (function (item, position) {
        return createItem (item.task, item.status, position)
    })
}

function cleanTasks () {
    const list = document.querySelector(".list-item")
    while (list.firstChild) {
        list.removeChild(list.lastChild)
    }
}

const empty = ""
const newItemInput = document.querySelector("#newItem")
newItemInput.addEventListener("keypress", addItemToDatabase)

function addItemToDatabase(event) {
    const typedKey = event.key
    const userText = event.target.value

    if (newItemInput.value == empty) {return}

    if (typedKey === "Enter") {
        const database = getToDatabase()
        database.push ({"task": userText, "status": empty})
        setToDatabase(database)
        connectScreenWithDatabase()
        event.target.value = null
    }
}

const list = document.querySelector(".list-item")
list.addEventListener("click", verifyClickedElement)


function verifyClickedElement (event) {
    const clickedElement = event.target
    const index = clickedElement.dataset.position

    if (clickedElement.type === "button") {
        removeTask(index)
    }

    else if (clickedElement.type === "checkbox") {
        updateTask(index)
    }
}

function removeTask(index) {
    const database = getToDatabase()
    database.splice(index,1)
    setToDatabase(database)
    connectScreenWithDatabase()
}

function updateTask(index) {
    const database = getToDatabase()
    database[index].status = database[index].status === empty ? "checked" : empty
    setToDatabase(database)
    connectScreenWithDatabase()
}

connectScreenWithDatabase()