const list = document.querySelector('.todo-list__body');
const input = document.querySelector('.todo-list__add');
const addButton = document.querySelector('.todo-list__button_add');


addButton.addEventListener('click', (e)=>{
    let value = input.value;
    if (value) {
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
        if (e.target.checked) {
            itemText.style.textDecoration = 'line-through';
        } else {
            itemText.style.textDecoration = 'none';
        }
    }
})
list.addEventListener('click', (e) => {
  if(e.target.classList.contains('item__delete')){
    let item = e.target.closest('.item');
    item.remove();
  }
})