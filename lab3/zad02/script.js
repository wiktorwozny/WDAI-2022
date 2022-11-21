var button = document.querySelector('button');
var i = 0;

button.addEventListener('click', onClick);

function onClick() {
    var img = document.querySelector('img');

    switch (i % 3) {
        case 0:
            img.src = "ocean.jpg";
            img.style.borderColor = 'deepskyblue';
            break;
        case 1:
            img.src = "forest.jpg";
            img.style.borderColor = 'darkgreen';
            break;
        case 2:
            img.src = "mountains.png";
            img.style.borderColor = 'indianred';
            break;
    }

    i++;
}
