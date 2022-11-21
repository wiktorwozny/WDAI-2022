const area = document.getElementById('area')
const circle = document.getElementById('circle')
const body = document.querySelector('body')

area.addEventListener('click', function (event) {

    let parentPosition = getPosition(area);
    let xPosition = event.clientX - parentPosition.x - (circle.offsetWidth / 2);
    let yPosition = event.clientY - parentPosition.y - (circle.offsetHeight / 2);
    let translate3dValue = "translate3d(" + xPosition + "px," + yPosition + "px, 0)"

    circle.style.transform = translate3dValue;
    event.stopPropagation();
})

function getPosition(el) {
    let xPosition = 0;
    let yPosition = 0;

    while (el) {
        if (el.tagName === "BODY") {
            let xScrollPos = el.scrollLeft || document.documentElement.scrollLeft;
            let yScrollPos = el.scrollTop || document.documentElement.scrollTop;

            xPosition += (el.offsetLeft - xScrollPos + el.clientLeft);
            yPosition += (el.offsetTop - yScrollPos + el.clientTop);
        } else {
            xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
            yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
        }

        el = el.offsetParent;
    }
    return {
        x: xPosition,
        y: yPosition
    };
}

body.addEventListener('click', () => {

    alert("outside the area!")

})


