var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var rightPressed = false;
var leftPressed = false;
var spacePressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.code  == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.code == 'ArrowLeft') {
        leftPressed = true;
    }
    else if(e.code === 'Space'){
        spacePressed = true
    }
}
function keyUpHandler(e) {
    if(e.code  == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.code == 'ArrowLeft') {
        leftPressed = false;
    }
    else if(e.code === 'Space'){
        spacePressed = false
    }
  }

class ball{
    constructor(x, y, radius){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.idx = 3;
    this.idy = -3;
    }

    calcAngle(player){
        
        let x = (player.x + (player.x+player.width))/2 -this.x;
        let y = player.y-this.y;
        let angle = Math.atan2(y,x);        
        angle = angle * (180 / Math.PI);
        return angle;
    }

   
    calcXMargin(player){
        if(this.x + this.radius >= player.x && this.x + this.radius <= player.x + player.width  || this.x - this.radius >= player.x && this.x - this.radius <= player.x + player.width){
            return true;
        }
        else{
            return false;
        }
    }
    calcYMargin(player){
        if(this.y + this.radius >= player.y && this.y + this.radius <= player.y + player.height){
            return true;
        }
        else{
            return false;
        }
    }

    verify(player) {
        if(this.x + this.radius >= 799 || this.x - this.radius <= 0){
            this.idx *= -1;
        };        
        if(this.calcYMargin(player) && this.calcXMargin(player)){
            let angle = this.calcAngle(player)
            this.idy *= -1;
            if(angle > 45 && this.idx <= 3){
                this.idx =3;
            }
            else if(angle <45 && this.idx >= -3){
                this.idx =-3;
            }
        };  

        if(this.y + this.radius >= 599){
            player.killball();
        } else if(this.y - this.radius  <= 0){
            this.idy *= -1;            
        };

    }

};

class player{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 5;
        this.idx = 3;
        this.ball = new ball((this.x + this.width)/2, this.y - 25, 20);
    }

    move(){
        if(leftPressed && this.x >= 0){
           this.x -= this.idx;
        }else if(rightPressed && this.x + this.width <= 800){
            this.x += this.idx;
        }    
    }
    killball(){
        delete this.ball.x;
        delete this.ball.y;
        this.ball = undefined;
    }
    newBall(){
        console.log(this.x, this.y, (this.x + (this.x+this.width)/2));
        this.ball = new ball((this.x + (this.x +this.width))/2, this.y - 25, 20);
    }
}


function renderBall(ball, player) {    
    ctx.beginPath();
    ctx.arc((ball.x + ball.idx),(ball.y+ ball.idy), ball.radius, 0, Math.PI*2);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
    ball.x += ball.idx;
    ball.y += ball.idy;
    ball.verify(player);
    
}

function renderPlayer(player) {
    ctx.beginPath();
    ctx.rect(player.x, player.y, player.width, player.height);
    ctx.fillStyle = "#00FF00";
    ctx.fill();
    ctx.closePath();
}

function render(player) {
    let ball = player.ball;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(spacePressed && player.ball == undefined){
        player.newBall();
        renderBall(player.ball, player);
    }

    if(ball != undefined){
        renderBall(ball, player);
    }  
    
    renderPlayer(player);
    
    player.move();
}

function main() {
    let myPlayer = new player(50, 500);    
    
    setInterval(render, 10,myPlayer);    
}

main();


