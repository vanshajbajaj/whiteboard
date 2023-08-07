const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let isDrawing = false;
let brushSize = 5;
let brushColor = "#000000";

function startDrawing(e) {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
}

function draw(e) {
    if (!isDrawing) return;
    ctx.lineTo(e.clientX, e.clientY);
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = brushColor;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
}

function stopDrawing() {
    isDrawing = false;
}

function changeBrushSize(e) {
    brushSize = e.target.value;
    document.getElementById("brushSizeOutput").textContent = brushSize;
}

function changeBrushColor(e) {
    // brushColor = e.target.dataset.clr;
    brushColor = e.target.value;
}

function changeBackground(e) {
    document.getElementsByTagName("body")[0].style.backgroundColor = e.target.value;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveCanvas() {
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "drawing.png";
    link.click();
}

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

document.getElementById("brushSize").addEventListener("input", changeBrushSize);
document.getElementById("colorPicker").addEventListener("input", changeBackground);
document.getElementById("brushColorPicker").addEventListener("input", changeBrushColor);
document.querySelector(".clear").addEventListener("click", clearCanvas);
document.querySelector(".save").addEventListener("click", saveCanvas);

const clrDivs = document.querySelectorAll(".clr");
clrDivs.forEach((clrDiv) => {
    clrDiv.addEventListener("click", changeBrushColor);
});
