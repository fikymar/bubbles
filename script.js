const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const header1 = document.querySelector('.first');
const header2 = document.querySelector('.second');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let measure1 = header1.getBoundingClientRect();
let measure2 = header2.getBoundingClientRect();
console.log(measure2)

let bubbleArr;

class Bubble {
    
    constructor (x, y, directionX, size){
        this.x = x;
        this.y = y;
        this.size = size;
        this.weight = size/20;
        this.directionX = directionX;
   
    }

    
    update() {
    //    this.x++;
    //     if (this.x > canvas.width){
    //         this.x = 0;
    //         this.x++;
    //     }
        
        this.y += this.weight;
        if (((this.y > canvas.height - this.size) || (this.y > measure1.y - this.size && ((this.x > measure1.x) && this.x < measure1.x + measure1.width)))){
            this.weight--;
           this.x += (Math.random() * 20) +2;
            
        }

        if (((this.y > canvas.height - this.size) || (this.y > measure2.y - this.size && ((this.x > measure2.x) && this.x < measure2.x + measure2.width)))) {
            this.weight-5;
            this.x += (Math.random() * 20) +2;
        }


        if (this.y < 0 + this.size){
            this.weight++;
            this.x -= (Math.random() * 20) +2;
        }
        
        
        if(this.x > canvas.width - this.size){
           this.x = 0;
        }
        

        
    }

    draw(){
      
        c.beginPath();
        c.shadowBlur = 5;
        c.shadowColor = "rgba(15,15,15,0.2)";
        c.shadowOffsetX = 10;
         c.shadowOffsetY = 10;
         c.strokeStyle = 'rgba(0,0,200,0.1)';
         c.fillStyle = "rgba(15,15,15,0.2)";
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        c.stroke();
        c.fill();
        c.closePath();

        // small circle
        c.beginPath();
        c.shadowBlur = 5;
        c.shadowColor = "rgba(0,0,0,0.5)";
        c.shadowOffsetX = 3;
         c.shadowOffsetY = 3;
         c.fillStyle = "rgba(230,230,230,0.1)";
        c.arc(this.x, this.y - this.y/3, this.size/3, 0, Math.PI * 2, false);
        c.fill();
        c.closePath();
        
      
    }
    
}




function init(){
    bubbleArr = [];
    const bubblesNr = 50;

    for (let i = 0; i < bubblesNr; i++) {
            let bubble = {
                x: Math.random() * canvas.width,
               y: Math.random() * canvas.height,
                size: (Math.random() * 30) +15,
               directionX: 5
              }
        bubbleArr.push(new Bubble(bubble.x, bubble.y, bubble.directionX, bubble.size));
    }

}

init();
console.log(bubbleArr)

function animate(){
    c.clearRect(0,0,canvas.width, canvas.height);
    for(let i = 0; i < bubbleArr.length; i++) {
        bubbleArr[i].update();
        bubbleArr[i].draw();
    }
    requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    measure1 = header1.getBoundingClientRect();
    measure2 = header2.getBoundingClientRect();
    init();
})