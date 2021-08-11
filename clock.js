var canvas = document.getElementById("Clock");
var ctx = canvas.getContext("2d"); //makes 2d drawing
var radius = canvas.height / 2;  
ctx.translate(radius, radius);   //remaping(0,0) 
radius = radius * 0.90 
setInterval(drawClock, 1000);



function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);

}

//drawing circle for clock
function drawFace(ctx, radius) {
    var radii;
    ctx.beginPath();
    ctx.arc(0,0, radius, 0, 2*Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill()
    radii = ctx.createRadialGradient(0,0,radius*0.95, 0,0, radius*1.05);
    radii.addColorStop(0, '#333');
    radii.addColorStop(0.5, 'white');
    radii.addColorStop(1, '#333');
    ctx.strokeStyle = radii;
    ctx.lineWidth = radius*0.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}

function drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius*0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for(num = 1; num < 13; num++){
        ang = num* Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius*0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0,0);
        ctx.rotate(ang);
        ctx.translate(0, radius*0.85);
        ctx.rotate(-ang);
    }
}


function drawTime(ctx, radius) {
    var now = new Date();
    var hr = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();

    hr=hr%12;
    hr=(hr*Math.PI/6)+
    (min*Math.PI/(6*60))+
    (sec*Math.PI/(360*60));
    drawHand(ctx, hr, radius*0.5, radius*0.07);


    min=(min*Math.PI/30)+(sec*Math.PI/(30*60));
    drawHand(ctx, min, radius*0.8, radius*0.07);

    sec=(sec*Math.PI/30);
    drawHand(ctx, sec, radius*0.9, radius*0.02);
}


function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}
