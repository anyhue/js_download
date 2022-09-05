// 캔버스 부르기
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.querySelector("#line-width");
const lineColor = document.querySelector("#line-color");
const colorOption = Array.from(document.getElementsByClassName("color-option"));
const mode = document.getElementById("mode");
const clear = document.getElementById("clearmode");
const eraser = document.getElementById("erasermode");
const fileInput = document.getElementById("file");
const textInput = document.getElementById("text");
const saveBtn = document.getElementById("savebtn");

let isPainting = false;
let isFilling = false;

canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;
// ctx.lineCap = "round";

const colors = [
    "#f03e3e",
    "#e64980",
    "#be4bdb",
    "#7950f2",
    "#4c6ef5",
    "#228be6",
    "#15aabf",
    "#12b886",
    "#40c057",
    "#82c91e",
    "#fab005",
    "#fd7e14"];

function onMousemove (event) {
    if (isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
    }

    ctx.moveTo(event.offsetX, event.offsetY);
    // const strokeColor = colors[Math.floor(Math.random() * colors.length)]
    // ctx.strokeStyle = strokeColor;
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
}

function startPainting(event) {
    isPainting = true;
}

function canclePainting(event) {
    isPainting = false;
}

function onLineWidthChange(event) {
    ctx.lineWidth = event.target.value;
    ctx.beginPath();
}

function onLineColorChange(event) {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
    ctx.beginPath();
}

function onColorOptionClick(event) {
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    lineColor.value = colorValue;
    ctx.beginPath();
}

function modeClick() {
    if(isFilling) {
        isFilling = false;
        mode.innerText = "Convert to FILL mode"
    } else {
        isFilling = true;
        mode.innerText = "Convert to DRAW mode";
    }
   
}

function onCanvasClickToFilling() {
    if(isFilling) {
        ctx.fillRect(0, 0, 800, 800);
    }
}

function onClear() {
    if(isFilling) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 800, 800);
    } else {
        isFilling = true;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 800, 800);
    }
}

function onEraser() {
    ctx.strokeStyle = "white";
    isFilling = false; 
    ctx.beginPath();
}

function onFileChange(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function () {
        ctx.drawImage(image, 0, 0, 800, 800);
        fileInput.value = null;
    };
}

function onDbclick(event) {
    const text = textInput.value;
    if(text !== "") {
        ctx.save();
        ctx.lineWidth = 2;
        ctx.font = '48px serif';
        ctx.fillText(text, event.offsetX, event.offsetY);
        ctx.restore();
    }
}

function onSaveBtn() {
    const url = canvas.toDataURL(); //url 생성
    const a = document.createElement("a"); //html에 a 생성해주기
    a.href = url; //url 불러오기
    a.download = "Drawing"; //저장될 때 이미지 이름
    a.click(); //클릭해서 저장
}

canvas.addEventListener("mousemove", onMousemove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", canclePainting);
canvas.addEventListener("mouseleave", canclePainting);
lineWidth.addEventListener("change", onLineWidthChange);
lineColor.addEventListener("change", onLineColorChange);
mode.addEventListener("click", modeClick);
canvas.addEventListener("click", onCanvasClickToFilling)
clear.addEventListener("click", onClear);
eraser.addEventListener("click", onEraser);

colorOption.forEach((lineColor) => lineColor.addEventListener("click", onColorOptionClick, false));

fileInput.addEventListener("change", onFileChange);
canvas.addEventListener("dblclick", onDbclick, true);
saveBtn.addEventListener("click", onSaveBtn);