const canvas = document.getElementById("jsCanvas")
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColors")
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const INITIAL_COLOR ="#2c2c2c"
const CONVAS_SIZE=700
const saveBtn = document.getElementById("jsSave");

canvas.width=CONVAS_SIZE;
canvas.height=CONVAS_SIZE;


ctx.fillStyle = "white";
ctx.fillRect(0, 0, CONVAS_SIZE, CONVAS_SIZE)
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle =INITIAL_COLOR;
ctx.lineWidth =2.5;


let painting =false;
let filling =false;

function stopPainting(){
 painting = false;
}

function startPainting(){
  painting=true;
}

function onMouseMove(event){
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting){
    ctx.beginPath();
    ctx.moveTo(x, y);
  }
  else{
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}


function HandleColorClick(event){
  console.log(event.target.style)
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}


function handleCanvasClick(){
  if(filling){
    ctx.fillRect(0, 0, CONVAS_SIZE, CONVAS_SIZE)
  }
}

function handleSaveClick(){
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download= "PaintJs[EXport]";
  link.click();
}

if(canvas){
  canvas.addEventListener("mousemove", onMouseMove) // 캔버스위에 마우스 움직임을 감지
  canvas.addEventListener("mousedown", startPainting) //마우스 다운은 클릭했을때 발생하는 event임. 클릭하고 손을 뗴지 않을..
  canvas.addEventListener("mouseup", stopPainting)
  canvas.addEventListener("mouseleave", stopPainting)
  canvas.addEventListener("click",handleCanvasClick)
}

function handleRangeChange(event){
  const size = event.target.value;
  ctx.lineWidth = size;
  ctx.fillStyle = color;
}

function handleModeClick(){
  if(filling === true){
    filling = false;
    mode.innerText = "fill";
  }else {
    filling = true;
    mode.innerText = "paint";

  }
}

Array.from(colors).forEach(color=>
  color.addEventListener("click",HandleColorClick)) //array.from 메소드는 object 로부터 array 를 만듦.

if (range){
  range.addEventListener("input",handleRangeChange)
}

if(mode){
  mode.addEventListener("click",handleModeClick)
}

if(saveBtn){
  saveBtn.addEventListener("click",handleSaveClick)
}