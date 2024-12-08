
document.getElementById('addListButton').addEventListener('click', function () {
    const listInput = document.getElementById('listInput');
    const listText = listInput.value.trim();

    if (listText) {
        const listContainer = document.createElement('div');
        listContainer.className = 'list';

        const title = document.createElement('h2');
        title.textContent = listText;
        listContainer.appendChild(title);

        const buttonContainer = document.createElement('div');

        const removeListButton = document.createElement('button');
        removeListButton.textContent = 'Удалить список';
        removeListButton.addEventListener('click', function () {
            listContainer.remove();
        });

        buttonContainer.appendChild(removeListButton);
        listContainer.appendChild(buttonContainer);

        const formContainer = document.createElement('div');
        const itemInput = document.createElement('input');
        itemInput.type = 'text';
        itemInput.placeholder = 'Введите название товара';

        const addItemButton = document.createElement('button');
        addItemButton.textContent = 'Добавить товар';

        formContainer.appendChild(itemInput);
        formContainer.appendChild(addItemButton);
        listContainer.appendChild(formContainer);

        const itemList = document.createElement('ul');
        itemList.className = 'item-list';
        listContainer.appendChild(itemList);

        addItemButton.addEventListener('click', function () {
            const itemText = itemInput.value.trim();

            if (itemText) {
                const li = document.createElement('li');
                li.textContent = itemText;

                const removeButton = document.createElement('button');
                removeButton.textContent = 'Удалить';
                removeButton.addEventListener('click', function () {
                    li.remove();
                });

                li.appendChild(removeButton);
                itemList.appendChild(li);
                itemInput.value = ''; // Очистка поля ввода
            }
        });

        document.getElementById('listsContainer').appendChild(listContainer);
        listInput.value = ''; // Очистка поля ввода списка
    }
    document.addEventListener('DOMContentLoaded', async () => {
        // Загрузка списков из базы данных
        const response = await fetch('http://localhost:5000/api/lists');
        const lists = await response.json();
        lists.forEach(list => addListToDOM(list));
    });

    document.getElementById('addListButton').addEventListener('click', async function () {
        const listInput = document.getElementById('listInput');
        const listText = listInput.value.trim();

        if (listText) {
            const newList = { name: listText, items: [] };
            const response = await fetch('http://localhost:5000/api/lists', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newList)
            });
            const list = await response.json();
            addListToDOM(list);
            listInput.value = ''; // Очистка поля ввода списка
        }
    });

    function addListToDOM(list) {
        const listContainer = document.createElement('div');
        listContainer.className = 'list';

        const title = document.createElement('h2');
        title.textContent = list.name;
        listContainer.appendChild(title);

        const buttonContainer = document.createElement('div');
        const removeListButton = document.createElement('button');
        removeListButton.textContent = 'Удалить список';

        removeListButton.addEventListener('click', async function () {
            await fetch(`http://localhost:5000/api/lists/${list._id}`, { method: 'DELETE' });
            listContainer.remove();
        });

        buttonContainer.appendChild(removeListButton);
        listContainer.appendChild(buttonContainer);

        const formContainer = document.createElement('div');
        const itemInput = document.createElement('input');
        itemInput.type = 'text';
        itemInput.placeholder = 'Введите название товара';

        const addItemButton = document.createElement('button');
        addItemButton.textContent = 'Добавить товар';

        formContainer.appendChild(itemInput);
        formContainer.appendChild(addItemButton);
        listContainer.appendChild(formContainer);

        const itemList = document.createElement('ul');
        itemList.className = 'item-list';
        listContainer.appendChild(itemList);

        addItemButton.addEventListener('click', function () {
            const itemText = itemInput.value.trim();
            if (itemText) {
                const li = document.createElement('li');
                li.textContent = itemText;

                const removeButton = document.createElement('button');
                removeButton.textContent = 'Удалить';
                removeButton.addEventListener('click', function () {
                    li.remove();
                });

                li.appendChild(removeButton);
                itemList.appendChild(li);
                itemInput.value = ''; // Очистка поля ввода
            }
        });

        document.getElementById('listsContainer').appendChild(listContainer);
    }
});

