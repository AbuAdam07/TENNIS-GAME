const canvas = document.querySelector("canvas");
 canvas.width = 350;
 canvas.height = 350;
 const c = canvas.getContext("2d");
    let count = 0;
    const myBox = {
        x: 140,
        y: 315,
        width: 70,
        height: 20,
        color: "rgb(15, 32, 60)",
        dx: 0,
        speed: 4 };

    const myCircle = {
        x: Math.random() * canvas.width,
        y: 10,
        dx : 2,
        dy : 2,
        speed: 2,
        radius: 8,
        color: "red", };

    function drawCircle(){
        c.beginPath();
        c.arc( myCircle.x, myCircle.y, myCircle.radius, 0, 2 * Math.PI, false );
        c.fillStyle = myCircle.color;
        c.fill();
        }

    var result = confirm(`Ваш счёт = ${count} \n Хотите начать заново?`);

    function drawBox() {
        c.clearRect(0, 0, canvas.width, canvas.height);
        c.fillStyle = myBox.color;
        c.fillRect(myBox.x, myBox.y, myBox.width, myBox.height);
            }

    function update() {
        if (myCircle.x + myCircle.radius > canvas.width) {

        myCircle.dx = -myCircle.speed;
        myCircle.x = canvas.width - myCircle.radius - myCircle.dx;
        } else if (myCircle.x - myCircle.radius < 0) {

        myCircle.dx = -myCircle.dx;
        myCircle.x = myCircle.radius;
        }
        if (myCircle.y + myCircle.radius > canvas.height) {
            myBox.dx = 0;
            if (result){
                location.reload();
                }
                return;}           

        else if (myCircle.y - myCircle.radius < 0) {
        myCircle.dy = -myCircle.dy;
        myCircle.y = myCircle.radius;
        }
        myCircle.x += myCircle.dx;
        myCircle.y += myCircle.dy;

        }

    function animateBox() {
        update();
        requestAnimationFrame(animateBox);
        // c.clearRect(0,0, window.innerWidth, window.innerHeight)
        myBox.x += myBox.dx;
        
        if (myBox.x + myBox.width > canvas.width) {
            myBox.dx = -myBox.speed;
            }
        if(myBox.x < 0 ){
            myBox.dx = myBox.speed;
                }

            drawBox();
            drawCircle();
        if (isColliding(myBox, myCircle)) {
            myBox.speed += 0.2;
            myCircle.speed += 0.2;
            myCircle.x+= myCircle.dx
            myCircle.y+= myCircle.dy
            myCircle.dx = -Math.abs(myCircle.dx);
            myCircle.dy = -myCircle.speed;
            count++;
            
                }
                
            }

    function isColliding(square, circle) {
        const dx = Math.abs(circle.x - square.x - square.width / 2);
        const dy = Math.abs(circle.y - square.y - square.height / 2);
            
        if (dx < square.width / 2 + circle.radius && dy < square.height / 2 + circle.radius) {
            return true;
            }
            return false;
            } 
    document.addEventListener("keydown", (event) => {
        if (event.code === "ArrowLeft") {
        myBox.dx = -myBox.speed;
        myBox.dy = 0;
        } else if (event.code === "ArrowRight") {
        myBox.dx = myBox.speed;
        myBox.dy = 0;
        }         
    });

            animateBox();