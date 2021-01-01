const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 500;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
ctx.fillStyle = INITIAL_COLOR;

let painting = false;
let filling = false;

function startPainting() {
    painting = true;
}

function stopPainting() {
    painting = false;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath(); // creates a new path every time we move the mouse and not clicking down
        ctx.moveTo(x, y);  // transfers the current starting point of path to the mouse
    } else {
        ctx.lineTo(x, y);  // connects the path from the last path in a straight line
        ctx.stroke();
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const width = event.target.value;
    ctx.lineWidth = width;
}

function handleModeClick() {
    if (filling) {
        mode.innerText = 'fill';
        filling = false;
    } else {
        mode.innerText = 'paint';
        filling = true;
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleCanvasClick);
}

Array.from(colors).forEach(color => 
    color.addEventListener('click', handleColorClick)
);

if (range) {
    range.addEventListener('input', handleRangeChange);
}

if (mode) {
    mode.addEventListener('click', handleModeClick);
}