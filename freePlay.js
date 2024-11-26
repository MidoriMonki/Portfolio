var row = 0;
//var originalPositionsY = ["0px", "110px", "110px", "110px", "220px", "220px", "220px", "220px", "220px", "330px", "330px", "330px", "440px"];
//var originalPositionsX = ["220px", "110px", "220px", "330px", "0px", "110px", "220px", "330px", "440px", "110px", "220px", "330px", "220px"];
var originalPositionsY = ["0", "20vw", "20vw", "20vw", "40vw", "40vw", "40vw", "40vw", "40vw", "60vw", "60vw", "60vw", "80vw"];
var originalPositionsX = ["40vw", "20vw", "40vw", "60vw", "0vw", "20vw", "40vw", "60vw", "80vw", "20vw", "40vw", "60vw", "40vw"];
var vPosX;
var uPosX;
var vPosY;
var uPosY;
var target;
var mode = 2;
var pixilsInRow;
var slideColour = ["1211121121311"];
var slide = document.getElementById("slide1");
var correct;
var whichPuzzle;
var puzzleList = ["001000131001110211120020013Rocket"]
var whichChild;
var beforeWho;
var amountOfBoxes;
var mummy = false;
var daddy = false;

var solution = 
[0, 0, 1, 0, 0,
 0, 1, 3, 1, 0,
 0, 1, 1, 1, 0,
 2, 1, 1, 1, 2,
 0, 0, 2, 0, 0];

var storePositions = 
[0, 0, 1, 0, 0,
 0, 2, 3, 4, 0,
 5, 6, 7, 8, 9,
 0,10,11,12, 0,
 0, 0,13, 0, 0];


target = 5;
var who = 12;

//Create each block
for (var i=0;i<13;i++){
    p = document.createElement("div");
    p.id = i+1;
    p.classList.add("box");
    document.getElementById("slide1").appendChild(p);
}


//Start by adding event listeners to each block
for (var i=0;i<13;i++)
{
    //For mobile
    slide.children[i].addEventListener('touchstart', dragStart);
    slide.children[i].addEventListener('touchend', dragEnd);
    slide.children[i].addEventListener('touchmove', dragMove);
    //For desktop
    slide.children[i].addEventListener('mousedown', dragStart);
    slide.children[i].addEventListener('mousemove', dragMove);
    document.addEventListener('mouseup', dragEnd);
}

//Event listeners
function dragStart(e)
{
  e = e || window.event;
  e.preventDefault();
  if (e.type == "touchstart"){
     uPosX = e.touches[0].clientX;
     uPosY = e.touches[0].clientY;
     target = e.target.id;
  }else{
    uPosX = e.clientX;
    uPosY = e.clientY;
    target = e.target.id;
  }
  // rumble reset
  for(var i=0;i<25;i++){
      if (storePositions[i] != 0){
        slide.children[storePositions[i]-1].classList.remove("rumble");
      }
  }
}

//Moving   mode0 = Y, mode1 = X, mode2= nothing I guess
function dragMove(e)
{
  console.log(e.type);
 // document.getElementById("test").innerHTML = storePositions;
  e = e || window.event;
  e.preventDefault();
  if (e.type == "touchmove"){
     vPosX = e.touches[0].clientX;
     vPosY = e.touches[0].clientY;
  }else{
     target = e.target.id;
     vPosX = e.clientX;
     vPosY = e.clientY;
  }
  
  // Important to determine which direction we scrolling, check later if desktop
  if (mode == 2 && e.type == "touchmove"){
    checkDirection();
  }
}

//Moving   mode0 = Y, mode1 = X, mode2= nothing I guess
function dragEnd(e)
{
  console.log(e.type);
  if(e.type != "touchmove"){
      checkDirection();
  }
  if (mode == 1){
      if (vPosX < uPosX && storePositions[row*5] == 0){
        //left
        for(var i=(row*5);i<(4+(row*5));i++){
          storePositions[i] = storePositions[i+1];
        }
        storePositions[(row*5)+4] = 0;
      }else if(vPosX > uPosX && storePositions[(row*5)+4] == 0){
        //right
        for(var i=(row*5)+4;i>(row*5);i--){
          storePositions[i] = storePositions[i-1];
        }
        storePositions[(row*5)] = 0;
      }else{
        //add rumble effect if failed
        for(var i=(row*5);i<(5+(row*5));i++){
        if (storePositions[i] != 0){
              if (i==(row*5) && vPosX < uPosX || i==(4+(row*5)) && vPosX > uPosX){
                 slide.children[storePositions[i]-1].classList.add("rumble");
              }
          }
        }
      }
      //Set their left property correctly
      for(var i=(row*5);i<(5+(row*5));i++){
        if (storePositions[i] != 0){
            slide.children[storePositions[i]-1].style.left = (2-(i-(row*5)))*-20+40 + "vw";

        }
      } 
  
  }else if (mode == 0){
      if (vPosY < uPosY && storePositions[row] == 0){
      //up
      for(var i=row;i<(row+20);i+=5){
        storePositions[i] = storePositions[i+5];
      }
      storePositions[row+20] = 0;
      }else if(vPosY > uPosY && storePositions[row+20] == 0){
      //down
      for(var i=row+20;i>row;i-=5){
        storePositions[i] = storePositions[i-5];
      }
      storePositions[row] = 0;
    }else{
        //add rumble effect if failed
        for(var i=0;i<5;i++){
        if (storePositions[row+(i*5)] != 0){
            if (i==0 && vPosY < uPosY || i==4 && vPosY > uPosY){
                slide.children[storePositions[row+(i*5)]-1].classList.add("rumble")
            }
        }
      } 
    }
    //Set their top property correctly
      for(var i=0;i<5;i++){
        if (storePositions[row+(i*5)] != 0){
            slide.children[storePositions[row+(i*5)]-1].style.top = (2-i)*-20+40 + "vw";
        }
      } 
  }
  
  mode = 2;
  checkSolution();
}


//Check to see if we are going horizontal or vertical and then select all pixils in that row :)
function checkDirection()
{
  if (Math.pow((vPosX - uPosX), 2) > Math.pow((vPosY - uPosY), 2)) {
       mode = 1;
       for (var i=0;i<25;i++){
         if (storePositions[i] == target){
             if (i <= 4){
             row = 0;   
             }else if (i <= 9){
             row = 1;
             }else if (i <= 14){
             row = 2;  
             }else if (i <= 19){
             row = 3;     
             }else if (i <= 24){
             row = 4;      
           } 
         }
       }
  }else{
      mode = 0;
      for (var i=0;i<25;i++){
         if (storePositions[i] == target){
             var cheese = i.toString()[i.toString().length - 1];
             if (cheese == 0 || cheese == 5){
             row = 0;   
             }else if (cheese == 1 || cheese == 6){
             row = 1;
             }else if (cheese == 2 || cheese == 7){
             row = 2;  
             }else if (cheese == 3 || cheese == 8){
             row = 3;     
             }else if (cheese == 4 || cheese == 9){
             row = 4;
           }    
         }
       }
    }
}


function checkSolution(){
  correct = true;
  if(mummy){
  for(i=0;i<25;i++){
      if (storePositions[i] == 0 && solution[i] == 0){}else{
        if ((slideColour[whichPuzzle])[storePositions[i]-1] != solution[i]){
            correct = false;
        }
      }
   }
  if (correct){
    mummy = false;
   setTimeout(function(){
      document.getElementById("yay").style.display = "block";
      document.getElementById("background2").style.background = "rgba(40, 40, 40, 0.4)";
      setTimeout(function(){ document.getElementById("continue").style.display = "block"; }, 700);
                         }, 400);

  }
  }
}


//set it up obviously
setUpSolution();

solve();


function setUpSolution(){
  mummy = false;
  var colourAlt = Math.floor(Math.random() * 3);
  storePositions = 
  [0, 0, 1, 0, 0,
   0, 2, 3, 4, 0,
   5, 6, 7, 8, 9,
   0,10,11,12, 0,
   0, 0,13, 0, 0];

   //Setting puzzle up

   whichPuzzle = Math.floor(Math.random() * (puzzleList.length));
   let why = (puzzleList[whichPuzzle]);
   for(var i=0;i<25;i++){
     let why = (puzzleList[whichPuzzle]);
     solution[i] = why[i];
   }
   amountOfBoxes = "" + why[25] + why[26];
   //Set up solution display
   whichChild = -1;
   for(var i=0;i<13;i++){
     if (i<amountOfBoxes){
        slide.children[i].classList.add("box");
        slide.children[i].classList.remove("byebye");
     }else{
        for (var f=0;f<25;f++){
          if (storePositions[f] == i+1){
            storePositions[f] = 0;
          }
        }
        slide.children[i].classList.remove("box");
        slide.children[i].classList.add("byebye");
     }
   }

   //put everything back to normal
   for(var i=0;i<25;i++){
     if(storePositions[i] != 0){
       slide.children[storePositions[i]-1].classList.remove("yes");
       slide.children[storePositions[i]-1].classList.remove("turq");
       slide.children[storePositions[i]-1].classList.remove("purple");
       slide.children[storePositions[i]-1].classList.remove("orange");
       slide.children[storePositions[i]-1].classList.remove("blue");
       slide.children[storePositions[i]-1].classList.remove("green");
       
       
       let yep = slideColour[whichPuzzle];
       if(yep[storePositions[i]-1] == 2){
         slide.children[storePositions[i]-1].classList.add("yes");
       }
       else if(yep[storePositions[i]-1] == 3){
         slide.children[storePositions[i]-1].classList.add("turq");
       }
       
       if(slide.children[storePositions[i]-1].classList.contains("yes")){
         if (colourAlt == 1){
             slide.children[storePositions[i]-1].classList.add("purple");
         }else if (colourAlt == 2){
             slide.children[storePositions[i]-1].classList.add("orange");
         }
       }else if(slide.children[storePositions[i]-1].classList.contains("turq")){
         if (colourAlt == 1){i
             slide.children[storePositions[i]-1].classList.add("green");
         }else if (colourAlt == 2){
             slide.children[storePositions[i]-1].classList.add("blue");
         }
       }
       slide.children[storePositions[i]-1].style.left = originalPositionsX[storePositions[i]-1];
       slide.children[storePositions[i]-1].style.top = originalPositionsY[storePositions[i]-1];
     }
   }
   setTimeout(function(){mummy=true;}, 2000);
}

async function solve(){
    await sleep(1200);
    solveDrag(0, 1, 0, 1);
    await sleep(400);
    solveDrag(2, 0, 1, 0);
    await sleep(400);
    solveDrag(0, 0, 1, 0);
    await sleep(400);
    solveDrag(2, 1, 1, 0);
    await sleep(400);
    solveDrag(1, 0, 1, 0);
    await sleep(400);
    solveDrag(0, 1, 1, 0);
    await sleep(400);
    solveDrag(1, 1, 0, 1);
    await sleep(400);
    solveDrag(2, 1, 0, 1);
    await sleep(400);
    solveDrag(4, 0, 0, 1);
    await sleep(400);
    solveDrag(2, 1, 1, 0);
    await sleep(400);
    solveDrag(0, 0, 0, 1);
    await sleep(400);
    solveDrag(1, 0, 0, 1);
    await sleep(400);
    solveDrag(0, 0, 0, 1);
    await sleep(400);
    solveDrag(4, 1, 0, 1);
    await sleep(400);
    solveDrag(4, 1, 0, 1);
    await sleep(400);
    solveDrag(0, 0, 0, 1);
}

function solveDrag(r, m, u, v){
    mode = m;
    row = r;
    uPosY = u;
    uPosX = u;
    vPosX = v;
    vPosY = v;
    if (mode == 1){
        if (vPosX < uPosX && storePositions[row*5] == 0){
          //left
          for(var i=(row*5);i<(4+(row*5));i++){
            storePositions[i] = storePositions[i+1];
          }
          storePositions[(row*5)+4] = 0;
        }else if(vPosX > uPosX && storePositions[(row*5)+4] == 0){
          //right
          for(var i=(row*5)+4;i>(row*5);i--){
            storePositions[i] = storePositions[i-1];
          }
          storePositions[(row*5)] = 0;
        }else{
          //add rumble effect if failed
          for(var i=(row*5);i<(5+(row*5));i++){
          if (storePositions[i] != 0){
                if (i==(row*5) && vPosX < uPosX || i==(4+(row*5)) && vPosX > uPosX){
                   slide.children[storePositions[i]-1].classList.add("rumble");
                }
            }
          }
        }
        //Set their left property correctly
        for(var i=(row*5);i<(5+(row*5));i++){
          if (storePositions[i] != 0){
              slide.children[storePositions[i]-1].style.left = (2-(i-(row*5)))*-20+40 + "vw";
  
          }
        } 
    
    }else if (mode == 0){
        if (vPosY < uPosY && storePositions[row] == 0){
        //up
        for(var i=row;i<(row+20);i+=5){
          storePositions[i] = storePositions[i+5];
        }
        storePositions[row+20] = 0;
        }else if(vPosY > uPosY && storePositions[row+20] == 0){
        //down
        for(var i=row+20;i>row;i-=5){
          storePositions[i] = storePositions[i-5];
        }
        storePositions[row] = 0;
      }else{
          //add rumble effect if failed
          for(var i=0;i<5;i++){
          if (storePositions[row+(i*5)] != 0){
              if (i==0 && vPosY < uPosY || i==4 && vPosY > uPosY){
                  slide.children[storePositions[row+(i*5)]-1].classList.add("rumble")
              }
          }
        } 
      }
      //Set their top property correctly
        for(var i=0;i<5;i++){
          if (storePositions[row+(i*5)] != 0){
              slide.children[storePositions[row+(i*5)]-1].style.top = (2-i)*-20+40 + "vw";
          }
        } 
    }

    mode = 2
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
