var i = 0;
var array = []

var add = document.getElementById('add')
var remove = document.getElementById('remove')
var p = document.querySelector('p')

add.addEventListener('click', () => {
    array.push(i);
    i++;
    console.log(array);
    p.innerText = array;
})

remove.addEventListener('click', () => {
    array.shift();
    console.log(array);
    p.innerText = array;
})
