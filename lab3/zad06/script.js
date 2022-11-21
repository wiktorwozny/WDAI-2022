const add = document.querySelector('#add');
const nameInput = document.getElementById('nameInput');
const phoneInput = document.querySelector('#phoneInput');
const wrapper = document.querySelector('.wrapper-inner');

add.addEventListener('click', addContact);

function addContact() {

    const name = nameInput.value;
    const phone = phoneInput.value;

    if (!isValid()) {
        return;
    }

    const div = document.createElement('div');
    div.className = 'element';

    div.innerHTML = "    <div class=\"data\">\n" +
        "                    <p>" + name + "</p>\n" +
        "                    <p>" + phone + "</p>\n" +
        "                </div>\n";

    const deleteBtn = document.createElement('div');
    deleteBtn.setAttribute("class", "delete");
    deleteBtn.innerHTML = "<img src=\"https://img.icons8.com/glyph-neue/35/000000/delete-forever.png\"/>";
    deleteBtn.setAttribute('onClick','return this.parentNode.remove();');
    div.appendChild(deleteBtn);

    wrapper.insertBefore(div, wrapper.firstChild);

    nameInput.value = null;
    phoneInput.value = null;
}

function isValid() {

    return (nameInput.checkValidity() && phoneInput.checkValidity());
}
