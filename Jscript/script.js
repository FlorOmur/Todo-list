//Переменная с тегом input
const addInput = document.querySelector('.add-input')
//Переменная с кнопкой добавление тегом button
const addBtn = document.querySelector('.add-btn')
//Переменная с тегом ul
const toDoList = document.querySelector('.to-do-list')

//Создаем переменную с массивом todos со значением всего li или пустой массив <Десериализация>
let allTodos = JSON.parse(localStorage.getItem('todos')) || []

const addNewItem = () => {/*Фукция добавление нового li*/
    /*Проверка значение input на пустоту и пробелы в начале строки с помощью <.trim() === ''>*/
    if (addInput.value.trim() === '') {
        alert('Please enter item name')
        addInput.value = ''
        return
    }
    allTodos = [...allTodos, addInput.value] /*В переменную массива добовляется новая элемент массива*/
    localStorage.setItem('todos', JSON.stringify(allTodos))/*Сохраняем строку в виде массива <СЕРИАЛИЗАЦИЯ>*/
    addInput.value = ''/*После добавление нового li отчищяем input*/
    drawList(allTodos)
}

/*Фукция при клике на кнопку добавление нового li*/
addBtn.addEventListener('click', () => { /*При клике на кнопку добавление*/
    addNewItem()/*Фукция добавление нового li*/
})
/*Фукция при нажатие на клавятуру <Enter> добавление нового li*/
addInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter'){
        addNewItem()/*Фукция добавление нового li*/
    }
})

/*Фукция создание нового li с дочерными элементами*/
const drawItem = (itemText) => {
    const li = document.createElement('li')/*Создаем li с помощью <document.createElement>*/
    /*Добовляем классы в li с помощью .classList.add*/
    li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'justify-content-between')
    const span = document.createElement('span')/*Создаем span с помощью <document.createElement>*/
    span.textContent = itemText/*Добовляем текст в span с помощью .textContent*/
    const button = document.createElement('button')/*Создаем button с помощью <document.createElement>*/
    button.classList.add('btn', 'btn-danger', 'btn-sm', 'delete-btn')/*Добовляем классы в button с помощью .classList.add*/
    const checkBox = document.createElement('input')
    checkBox.setAttribute("type", "checkbox")
    checkBox.classList.add('form-check-input')
    button.textContent = 'delete'/*Добовляем текст в button с помощью .textContent*/
    li.appendChild(checkBox)
    li.appendChild(span)/*span делаем дочерным элементом li с помощью .appendChild*/
    li.appendChild(button)/*button делаем дочерным элементом li с помощью .appendChild*/
    toDoList.appendChild(li)/*li делаем дочерным элементом ul с помощью .appendChild*/
}

/*Фукция при кликке на кнопку <Delete>*/
const clickDeleteBtn = () => {
    const deleteButtons = document.querySelectorAll('.delete-btn')/*Принимаем все кнопки <Delete>*/
    deleteButtons.forEach((deleteBtn, btnIndex) => {/*Перебираем массив с .forEach*/
        deleteBtn.addEventListener('click', () =>{/*При кликке на одну из кнопок*/
            /*Фильтруем массив и оставляем li не равный с индексом кнопки Delete*/
            allTodos = allTodos.filter((todoFromStorage, indexFromStorage) => btnIndex !== indexFromStorage)
            localStorage.setItem('todos', JSON.stringify(allTodos))/*Сохраняем строку в виде массива <СЕРИАЛИЗАЦИЯ>*/
            drawList(allTodos)
        })
    })
}

const drawList = (array) => {
    toDoList.innerHTML = ''
    array.forEach((todo) => {
        drawItem(todo)
    })
    clickDeleteBtn()
}

drawList(allTodos)
