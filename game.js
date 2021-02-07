
var tela = document.createElement("canvas");
var ctx = tela.getContext("2d");
tela.width = 720;  // largura
tela.height = 480; // altura
document.body.appendChild(tela);        // extrutura


var perm = [];
while (perm.length < 500){
  while(perm.includes(val = Math.floor(Math.random()*500)));
  perm.push(val);
}

var lerp = (a,b,t) => a + (b-a) * (1-Math.cos(t*Math.PI))/2;
var ondas = x=>{
  x = x * 0.01 % 500;   // suavização dos picos
  return lerp(perm[Math.floor(x)], perm[Math.ceil(x)], x - Math.floor(x));
}


var player = new function () {
    this.x = tela.width/3; // posição no eixo X ↔
    this.y = 0;
    this.ySpeed = 0;
    this.rotacao = 0;
    this.rSpeed = 0;

    this.img = new Image();
    this.img.src = "moto.png";
   
    this.draw = function(){ // posição da moto
        var plano1 =  tela.height - ondas(t + this.x) * 0.30;
        var plano2 =  tela.height - ondas(t + this.x) * 0.30;
    
        var terra = 0;
        if(plano1-50 > this.y){
          this.ySpeed += 0.5;
        }else{
          this.ySpeed -= this.y - (plano1-50);
          this.y = plano1 - 50;
          terra = 0;
        }
    
        //var angle = Math.atan2((p2-60) - this.y, (this.x+10) - this.x);
        this.y += this.ySpeed;
    
        if(!playing || terra && Math.abs(this.ratacao) > Math.PI * 0.5){
          playing = false;
          this.rSpeed = 5;
          k.ArrowUp = 1;
          this.x -= speed * 5;
        }
    
    
        if(terra && playing){
          this.rotacao -= (this.rotacao - angle) * 0.5;
          this.rSpeed = this.rSpeed - (angle - this.rotacao);
        }
        this.rSpeed += (k.ArrowLeft - k.ArrowRight) * 0.05;
        this.rotacao -= this.rSpeed * 0.01;
        if(this.rotacao > Math.PI) this.rotacao = -Math.PI;
        if(this.rotacao < -Math.PI) this.rotacao = Math.PI;
        ctx.save();
        ctx.translate(this.x, this.y - 3);
        ctx.rotate(this.rotacao);
        ctx.drawImage(this.img, -15, -15, 60, 60); // tamanho da moto
        ctx.restore();
      }
    }
    

//var player = new Player();
var t = 0;
var speed = 0;
var playing = true;
var k = {ArrowUp:0, ArrowDown:0, ArrowLeft:0, ArrowRight:0};
function loop(){
  speed -= (speed - (k.ArrowUp - k.ArrowDown)) * 0.01;
  t += 10 * speed;
    
    ctx.fillStyle = "#19f";
    ctx.fillRect(0,0,tela.width, tela.height); // A função fillRect() desenha um grande quadrado preto = fillRect(x, y, width, height)
    
    ctx.fillStyle = "#405042";   // montanhas
    ctx.beginPath();
    ctx.moveTo(0, tela.height);
    for (let i = 0; i < tela.width; i++)
    ctx.lineTo(i, tela.height*0.8/*altura geral*/ - ondas(t + i/0.5)/*←altura curva*/ * 0.50/*←altura picos*/ );
    ctx.lineTo(tela.width, tela.height);
    ctx.fill();

    ctx.fillStyle = "#372A1E";  // morros
    ctx.beginPath();
    ctx.moveTo(0, tela.height);
    for (let i = 0; i < tela.width; i++)
    ctx.lineTo(i, tela.height*0.9 - ondas(t + i/1.5) * 0.20);
    ctx.lineTo(tela.width, tela.height);
    ctx.fill();

    ctx.fillStyle = "#6A3403"; // chão
    ctx.beginPath();
    ctx.moveTo(0, tela.height);
    for (let i = 0; i < tela.width; i++)
    ctx.lineTo(i, tela.height*0.95 - ondas(t + i*1) * 0.25);
    ctx.lineTo(tela.width, tela.height);
    ctx.fill();

    player.draw();
    if(player.x < 0)
    restart();
    requestAnimationFrame(loop);                         // requestAnimationFrame ()  chama a sua rotina de renderização 
}

onkeydown = d=> k[d.key] = 1;
onkeyup = d=> k[d.key] = 0;

function restart(){

  player = new Player();
  t = 0;
  speed = 0;
  playing = true;
  k = {ArrowUp:0, ArrowDown:0, ArrowLeft:0, ArrowRight:0};

}
loop();