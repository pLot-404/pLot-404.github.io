let canvas = document.querySelectorAll("canvas");
let ctx = canvas[0].getContext("2d");
let codes = [
    ["つ", "ま", "て", "に"],
    ["や", "る", "ひ", "ん"],
    ["す", "あ", "す", "か"],
    ["み", "と", "し", "よ"]
];
ctx.fillStyle = "rgba(204,204,204,.5)"
ctx.beginPath();
ctx.moveTo(200,0);
ctx.lineTo(100,130);
ctx.lineTo(150,130);
ctx.lineTo(150,250);
ctx.lineTo(250,250);
ctx.lineTo(250,130);
ctx.lineTo(300,130);
ctx.fill();
ctx.fillStyle="#000"
for (let i = 1; i <=3; i++) {
    ctx.beginPath();
    ctx.moveTo(i * 100, 0);
    ctx.lineTo(i * 100, 400);
    ctx.stroke();
    ctx.moveTo(0, i * 100);
    ctx.lineTo(400, i * 100)
    ctx.stroke();
}
ctx.fillStyle = "#602d1d"
for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
        ctx.beginPath()
        ctx.arc(50 + 100 * i, 50 + 100 * j, 40, 0, Math.PI * 2)
        ctx.fill();
    }
}
ctx.fillStyle = "#582509";
ctx.font = "60px sans-serif";
for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
        ctx.fillText(codes[i][j], 20 + 100 * j, 65 + 100 * i)
    }
}

ctx = canvas[1].getContext("2d");
ctx.fillStyle = "rgba(204,204,204,.5)"
ctx.beginPath();
ctx.moveTo(0,200);
ctx.lineTo(130,100);
ctx.lineTo(130,150);
ctx.lineTo(250,150);
ctx.lineTo(250,250);
ctx.lineTo(130,250);
ctx.lineTo(130,300);
ctx.fill();
ctx.fillStyle="#000"
for (let i = 1; i <=3; i++) {
    ctx.beginPath();
    ctx.moveTo(i * 100, 0);
    ctx.lineTo(i * 100, 400);
    ctx.stroke();
    ctx.moveTo(0, i * 100);
    ctx.lineTo(400, i * 100)
    ctx.stroke();
}
ctx.closePath();
ctx.beginPath();
ctx.arc(250,250,5,0,Math.PI*2);
ctx.fill();
ctx.beginPath();
ctx.moveTo(250,250);
ctx.lineTo(250,150);
ctx.lineTo(150,150);
ctx.lineTo(150,350);
ctx.lineTo(350,350);
ctx.lineTo(350,50);
ctx.lineTo(50,50);
ctx.lineTo(50,350);
ctx.lineTo(20,320);
ctx.stroke();
