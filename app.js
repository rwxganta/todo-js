const list = document.querySelector('.js-list');
const addBtn = document.querySelector('.js-add');
const addItemModal = document.querySelector('.js-modal');
const inputItemDesc = document.querySelector('#item-desc');
const confirmAddItem = document.querySelector('.js-confirm');
const cancelAddItem = document.querySelector('.js-cancel');



addBtn.addEventListener('click', () => {
    addItemModal.showModal();
});

confirmAddItem.addEventListener('click', () => {
    const item = document.createElement('li');
    item.innerHTML = `
    <p class='list-item--desc'>${inputItemDesc.value}</p>
        <div class="actions">
            <button class='btn finished js-task-finished'></button>
            <button class='btn cancel js-task-cancel'></button>
        </div>
    `;
    item.classList.add('list-item');
    item.setAttribute('data-state', 'created');
    list.append(item);

    const itemsFinishedBtn = document.querySelectorAll('.js-task-finished');
    const listNItems = list.childElementCount;
    itemsFinishedBtn.forEach((item, idx) => {
        // GAMBIARRA: Doing that return; so list items that
        // already have a eventListener don't get any extra.
        if (idx + 1 < listNItems) return;
        item.addEventListener('click', (e) => {
            const closestItem = e.target.closest('.list-item');
            closestItem.setAttribute('data-state', 
            closestItem.getAttribute('data-state') === 'created' ? 'finished' : 'created');
        });
    });

    const itemsCancelBtn = document.querySelectorAll('.js-task-cancel');
    itemsCancelBtn.forEach((item) => {
        item.addEventListener('click', (e) => {
            const parent = e.target.closest('.list-item');
            parent.remove();
        });
    });

    closeModal();
});

cancelAddItem.addEventListener('click', () => {
    closeModal();
});



function openModal() {
    addItemModal.showModal();
}

function closeModal() {
    inputItemDesc.value = '';
    addItemModal.close();
}
