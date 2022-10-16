

const grid= document.querySelector('.grid')
const scoreDisplay= document.querySelector('#score')

const boardHeight= 300
const boardWidth= 560
const blockHeight= 20
const blockWidth= 100
const ballDiameter= 10
let xPosition= -2
let yPosition= 2
let timerId
let score=0

const userStart= [230, 10]
let currentPosition= userStart

 const ballStart= [270, 40]
 let ballCurrentPosition= ballStart



class Block{
  constructor(xPos, yPos){
    this.bottomLeft= [xPos, yPos]
    this.bottomRight= [xPos + blockWidth, yPos]
    this.topLeft=[xPos, yPos+ blockHeight]
    this.topRight=[xPos+blockWidth, yPos+blockHeight]
  }
}
const blocks=[
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(10, 230),
  new Block(120, 230),
  new Block(230, 230),
  new Block(340, 230),
  new Block(450, 230),
  new Block(10, 190),
  new Block(120, 190),
  new Block(230, 190),
  new Block(340, 190),
  new Block(450, 190),
]
//add blocks

function addBlocks(){
  for(let i=0; i< blocks.length;i++){
    const block= document.createElement('div')
    block.classList.add('block')
    block.style.left= blocks[i].bottomLeft[0]+ 'px'
    block.style.bottom= blocks[i].bottomLeft[1] + 'px'
    grid.appendChild(block)
}
}

//add user
const user= document.createElement('div')
user.classList.add('user')
grid.appendChild(user)
drawUser()

function drawUser(){
user.style.left= currentPosition[0]+ 'px'
user.style.bottom= currentPosition[1] + 'px'
}

//add ball
const ball= document.createElement('div')
ball.classList.add('ball')
grid.appendChild(ball)
drawBall()

function drawBall(){
  ball.style.left= ballCurrentPosition[0] + 'px'
  ball.style.bottom= ballCurrentPosition[1] + 'px'
  
}
  
//move ball

function moveBall(){
    ballCurrentPosition[0] += xPosition
    ballCurrentPosition[1] += yPosition
    drawBall()
    checkForCollisions()
}
timerId= setInterval(moveBall, 30)

function checkForCollisions(){
      //check for block collision
      for(let i=0;i< blocks.length;i++){
        if(ballCurrentPosition[0] > blocks[i].bottomLeft[0]&&
          ballCurrentPosition[0] < blocks[i].bottomRight[0]&&
          ballCurrentPosition[1]+ ballDiameter >= blocks[i].bottomLeft[1]&&
          ballCurrentPosition[1]+ ballDiameter< blocks[i].topLeft[1])
          {
            const allBlocks= Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i,1)
            changeDirection()
            score++
            scoreDisplay.innerHTML= score
            if(blocks.length===0){
              scoreDisplay.innerHTML= 'You win'
              clearInterval(timerId)
              document.removeEventListener('keydown',moveUser)
            }
          }

      }
      //checking for wall collision
      if(ballCurrentPosition[0]>= (boardWidth-ballDiameter)||
      ballCurrentPosition[0]<=0 ||
      ballCurrentPosition[1] >= (boardHeight-ballDiameter)){
        changeDirection()
      }
      //check for user Collision
      if(ballCurrentPosition[0]>currentPosition[0]&&
        ballCurrentPosition[0]< currentPosition[0]+ blockWidth&&
        ballCurrentPosition[1]>currentPosition[1]&&
        ballCurrentPosition[1]< currentPosition[1]+ blockHeight){
          changeDirection()
        }

    //game over
    if (ballCurrentPosition[1] <= 0) {
          clearInterval(timerId)
          scoreDisplay.innerHTML = 'You lose!'
         document.removeEventListener('keydown', moveUser)
      }
      
    
}
function changeDirection(){
  if (xPosition===2 && yPosition===2){
    yPosition = -2
    return
  }
  if(xPosition===2 && yPosition=== -2){
    xPosition= -2
    return
  }
  if(xPosition===-2 && yPosition===2){
    xPosition= 2
    return
  }
  if(xPosition===-2 && yPosition===-2){
    yPosition= 2
      return
  }
}

//move user

function moveUser(e){
  switch(e.key){
    case 'ArrowLeft':
      if(currentPosition[0]>0)
      currentPosition[0] -= 10
      drawUser()
      break
    case 'ArrowRight':
      if(currentPosition[0]<(boardWidth-blockWidth))
      currentPosition[0] += 10
      drawUser()
      break
  }
}  
document.addEventListener('keydown',moveUser)

addBlocks()
moveBall()
