var button = document.querySelector('button')

button.addEventListener('click', onClick)

function onClick() {
    var string = window.prompt("Gimme your name pls:")
    var name = document.getElementById('name')
    name.innerText = string
}
