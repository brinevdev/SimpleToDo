const list = document.querySelector('.todo-list__body');
const input = document.querySelector('.todo-list__add');
const addButton = document.querySelector('.todo-list__button_add');
const clearAllButton = document.querySelector('.todo-list__button_clear');

(function(){
    let db = JSON.parse(localStorage.getItem('data'));
    if (!db) {
        localStorage.setItem('data',JSON.stringify({
            allTasks:[],
        }));
        db = JSON.parse(localStorage.getItem('data'));
    }
    let data = db.allTasks;
    data.forEach((item)=>{
        list.insertAdjacentHTML('beforeend',`
        <div class="todo-list__item item">
            <div class="item__task">
            <input type="checkbox"  ${item.checked ? 'checked': ''} class="item__checkbox">
            <div class="item__text" ${item.checked ? 'style="text-decoration:line-through"': ''}>
            ${item.text}
            </div>
            </div>
            <div class="item__delete"></div>
        </div>
        `);
    })
})()

addButton.addEventListener('click', (e)=>{
    let value = input.value;
    if (value) {
        let db = JSON.parse(localStorage.getItem('data'));
        db.allTasks.push({
            text:value,
            checked:false,
        });
        localStorage.setItem('data',JSON.stringify(db)); 
        list.insertAdjacentHTML('beforeend',`
        <div class="todo-list__item item">
            <div class="item__task">
            <input type="checkbox" class="item__checkbox">
            <div class="item__text">${value}</div>
            </div>
            <div class="item__delete"></div>
        </div>
        `);
        input.value = '';
    }
});

list.addEventListener('click', (e) => {
    if (e.target.type == 'checkbox') {
        let item = e.target.closest('.item');
        let itemText = item.querySelector('.item__text');
        let db = JSON.parse(localStorage.getItem('data'));
        let data = db.allTasks;
        let itemIndex = data.findIndex((item)=>item.text === itemText.innerText);
        if (e.target.checked) {
            itemText.style.textDecoration = 'line-through';
            data[itemIndex].checked = true;
        } else {
            itemText.style.textDecoration = 'none';
            data[itemIndex].checked = false;
        }
        localStorage.setItem('data',JSON.stringify(db));
    }
})

list.addEventListener('click', (e) => {
  if(e.target.classList.contains('item__delete')){
    let item = e.target.closest('.item');
    item.remove();
    let itemText = item.querySelector('.item__text').innerText;
    let db = JSON.parse(localStorage.getItem('data'));
    let data = db.allTasks;
    let itemIndex = data.findIndex((item)=>item.text === itemText);
    data.splice(itemIndex,1);
    localStorage.setItem('data',JSON.stringify(db));
  }
})

clearAllButton.addEventListener('click', ()=> {
    let allTasks = list.querySelectorAll('.item');
    allTasks.forEach((task)=>task.remove());
    let db = JSON.parse(localStorage.getItem('data'));
    if (db) {
        db.allTasks = [];
        localStorage.setItem('data',JSON.stringify(db));
    }
});


