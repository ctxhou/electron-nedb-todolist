const {remote} = require('electron');

const dbInstance = remote.getGlobal('db');

function createTodoItemView(content) {
    const liNode = document.createElement('li');
    // close button
    const span = document.createElement("span");
    span.className = 'close';
    const txt = document.createTextNode("\u00D7");
    span.appendChild(txt);

    liNode.textContent = content;
    liNode.appendChild(span);
    return liNode;
}

function updateView() {
    const todolistNode = document.getElementById('todolist');
    todolistNode.innerHTML = '';

    dbInstance.readAll()
    .then(allTodolists => {
        allTodolists.forEach(item => {
            const liNode = createTodoItemView(item.content);
            todolistNode.appendChild(liNode);
        });
    })
}

document.getElementById('addBtn').addEventListener('click', () => {
    const inputValue = document.getElementById('myInput').value;
    if (inputValue) {
        dbInstance.create({content: inputValue})
        .then(result => {
            document.getElementById('myInput').value = null;
            updateView();
        })
    }
})

updateView();