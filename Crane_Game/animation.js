var red = false; //button true/false
var blue = false; //button true/false
var green = false; //button true/false
var isAscent = false; //after picking start ascent
var isdescent = false; //decsent at goal 
var goZero = false; //return zero
var moving = false;//crane move

var isPicking = false; //is picking the ball
var isangle0 = false;
var isangle1 = false;
var isangle2 = false;
var isSuccess = false;
var redBall = {x: 40, y: -100, z: -20};
var blueBall = {x: -70, y: -100, z: -20};
var greenBall = {x: -30, y: -100, z:0};

var ballMoved = {red:false, blue:false, green:false};
//var ballMoved = {red:true, blue:true, green:true};
var dancing = false;
var dance_descent = false;
var swaying = false;
var sway_descent = false;
var sway_count = 0;


function returnToZero(){
    if(torsoHeight<10){
        torsoHeight += 0.1;
        // cameraY -= 0.001;
    }else{
        torsoHeight = 10;
        // cameraY = 0.0;
        if(torsoZ>0.0){
            torsoZ -= 0.1;
        }else{
            torsoZ = 0.0;
            if(torsoX>0){
                torsoX -= 0.1;
                // cameraX += 0.0005;
            }else{
                torsoX = 0.0;
                // cameraX = 0.0;
                goZero = false;
                isSuccess = true;
            } 
        }
        
    }
}


var pickBall = false;
var judging = true;
var red_j = false; //button true/false
var blue_j = false; //button true/false
var green_j = false; //button true/false

function moveCrane(){

    if(torsoX >= 2.35 && torsoX <= 3.05){
        if(torsoZ >= -1.4 && torsoZ <= -1.0){
            if(judging && !ballMoved.red){
                red_j = true;
            }
        }
    }
    else if(torsoX >= -2.65 && torsoX <= -1.95){
        if(torsoZ >= -0.2 && torsoZ <= 0.2){
            if(judging && !ballMoved.green){
                green_j = true;
            }
        }
    }else if(torsoX >= -5.05 && torsoX <= -4.35){
        if(torsoZ >= -1.4  && torsoZ <= -1.0){
            if(judging && !ballMoved.blue){
                blue_j = true;
            }
        }
    }
    judging = false;

    
    if(!isAscent)
    {     
        if(torsoHeight>1){
            torsoHeight -= 0.1;
            // cameraY += 0.0005;
            // cameraZ += 0.001;
        }
        else{
            if(!isPicking){
                moveCraneAngle();
                if(red_j && pickBall) redBall.y += 0.2;
                else if(green_j && pickBall) greenBall.y += 0.2;   
                else if(blue_j && pickBall) blueBall.y += 0.2;   
            }
            else{
                isAscent = true;
            }
        }    
    }else{

        if(torsoHeight<10 && !isdescent){
            torsoHeight += 0.05;
            if(red_j) redBall.y += 0.65;
            else if(green_j) greenBall.y += 0.65;  
            else if(blue_j) blueBall.y += 0.65;
            // cameraY -= 0.001;
        }
        else
        {
            isdescent = true;
            if(torsoZ<1.0){
                torsoZ += 0.01;
                if(red_j) redBall.z += 0.3;
                else if(green_j) greenBall.z += 0.3;
                else if(blue_j) blueBall.z += 0.3;
            }
            else{
                torsoZ = 1.0;
                if(red_j) redBall.z = 1.0;
                else if(green_j) greenBall.z = 1.0;
                else if(blue_j) blueBall.z = 1.0;

                if(torsoX<12){
                    torsoX += 0.05;
                    if(red_j) redBall.x += 0.7;
                    else if(green_j) greenBall.x += 0.7;
                    else if(blue_j) blueBall.x += 0.7;
                    // cameraX += 0.0005;
                } 
                else{
                    if(torsoHeight>2.5)
                    {
                        torsoHeight -= 0.1;
                        if(red_j) redBall.y -= 1.4;
                        else if(green_j) greenBall.y -= 1.4;
                        else if(blue_j) blueBall.y -= 1.4;
                        // cameraY += 0.001;
                    }  
                    else{
                        if(red_j){
                            moving = returnCraneAngle("red");
                        }else if(green_j){
                            moving = returnCraneAngle("green");
                        }else if(blue_j){
                            moving = returnCraneAngle("blue");
                        }else{
                            moving = returnCraneAngle("none");
                        }
                        
                    } 
                }
            } 
        }
    }
}
function redCrane(){
    if(!isAscent)
        {
            if(torsoZ>-1.2){
                torsoZ -= 0.1;
            }else{
                if(torsoX<3){
                    torsoX += 0.1;
                     //cameraX -= 0.001;
                }else{
                    if(torsoHeight>1){
                        torsoHeight -= 0.1;
                        // cameraY += 0.0005;
                        // cameraZ += 0.001;
                    }
                    else{
                        if(!isPicking){
                            moveCraneAngle();
                            if(pickBall)
                            redBall.y += 0.2;
                            
                        }
                        else
                            isAscent = true;
                    }    
                }
            }
            
        }else{
            if(torsoHeight<10 && !isdescent){
                torsoHeight += 0.05;
                redBall.y += 0.65;
                // cameraY -= 0.001;
            }
            else
            {
                isdescent = true;
                if(torsoZ<1.0){
                    torsoZ += 0.01;
                    redBall.z += 0.3;
                }else{
                    torsoZ = 1.0;
                    // redBall.z = 1.0;
                    if(torsoX<12){
                        torsoX += 0.05;
                        redBall.x += 0.7;
                        // cameraX += 0.0005;
                    } 
                    else{
                        if(torsoHeight>2.5)
                        {
                            torsoHeight -= 0.1;
                            redBall.y -= 1.4;
                            // cameraY += 0.001;
                        }  
                        else
                            red = returnCraneAngle("red");
                    }
                }
               
            }
        }
}

function blueCrane(){
    if(!isAscent)
    {
        if(torsoZ>-1.2){
            torsoZ -= 0.1;
        }else{
            if(torsoX>-5){
                torsoX -= 0.1;
            }else{
                if(torsoHeight>1)
                    torsoHeight -= 0.1;
                else{
                    if(!isPicking){
                        moveCraneAngle();
                        if(pickBall)
                            blueBall.y += 0.2;
                    }
                    else
                        isAscent = true;
                }    
            }
        }
       
    }else{
        if(torsoHeight<10 && !isdescent){
            torsoHeight += 0.05;
            blueBall.y += 0.65;
        }
        else
        {
            isdescent = true;
            if(torsoZ<1.0){
                torsoZ += 0.01;
                blueBall.z += 0.3; 
            }else{
                torsoZ = 1.0;
                if(torsoX<12){
                    torsoX += 0.05;
                    blueBall.x += 0.7;
                }
                   
                else{
                    if(torsoHeight>2.5){
                        torsoHeight -= 0.1;
                        blueBall.y -= 1.4;
                    }
                    else
                        blue = returnCraneAngle("blue");
                }
            }
        }
    }
}

function greenCrane(){
    if(!isAscent)
    {
        if(torsoX>-2){
            torsoX -= 0.1;
        }else{
            if(torsoHeight>1)
                torsoHeight -= 0.1;
            else{
                if(!isPicking)
                {
                    moveCraneAngle();
                    if(pickBall)
                            greenBall.y += 0.2;
                    
                }
                else
                    isAscent = true;
            }    
        }
    }else{
        if(torsoHeight<10 && !isdescent){
            torsoHeight += 0.05;
            greenBall.y += 0.65;
        }
        else
        {
            isdescent = true;
            if(torsoZ<1.0){
                torsoZ += 0.01;
                greenBall.z += 0.3; 
            }else{
            if(torsoX<12){
                torsoX += 0.05;
                greenBall.x += 0.7;
            }
            else{
                if(torsoHeight>2.5){
                    torsoHeight -= 0.1;
                    greenBall.y -= 1.4;
                }else
                    green = returnCraneAngle("green");
            }}
        }
    }
}


function moveCraneAngle(){
    if(craneAngle[0]<20){
        craneAngle[0] += 0.1;
    }else{
        if(craneAngle[1]<75){
            pickBall = true;
            craneAngle[1] += 0.1;
        }else{
            if(craneAngle[2]<70){
                
                craneAngle[2] += 0.1;
                // redBallHeight += 0.1;
            }else{
                isPicking = true;
                //cameraZ = -0.2;
            }
        }
    }
}

function returnCraneAngle(ball_color){
    if(craneAngle[2]>60){
        craneAngle[2] -= 0.1;
    }else{
        if(craneAngle[1]>70){
            craneAngle[1] -= 0.1;
        }else{
            if(craneAngle[0]>10)
                craneAngle[0] -= 0.1;
            else{
                isAscent = false;
                goZero = true;
                isdescent = false;
                isPicking = false;
                pickBall = false;
                if(ball_color == "red") {ballMoved.red = true; red = false; red_j = false;}
                else if(ball_color == "green") {ballMoved.green = true; green = false; green_j = false;}
                else if(ball_color == "blue") {ballMoved.blue = true; blue = false; blue_j = false;}
                return false;

            }
        }
    }
    return true;
}

function dance(){
    
    if(!dance_descent){

        if(elbowLeft_j.theta > 0){
            elbowLeft_j.theta -= 3;
            elbowRight_j.theta += 3;
            
            cameraX += 0.03;
            cameraZ -= 0.02;
            console.log(cameraX, cameraZ);
            return;
        }
        else if(shoulderLeft_j.zTheta > -150){
            shoulderLeft_j.zTheta -= 3;
            shoulderRight_j.zTheta += 3;
            shoulderLeft_j.yTheta += 0.4;
            shoulderRight_j.yTheta -= 0.4;
            return;
        }
        else{
            swaying = true;
            dancing = false;
        }

    }
    else{

        if(waist_j.theta < 0){
            waist_j.theta += 1;
            head_j.theta += 1;
            shoulderLeft_j.xTheta += 1;
            shoulderRight_j.xTheta -= 1;
            thighLeft_j.theta += 0.4;
            thighRight_j.theta -= 0.4;
            kneeLeft_j.theta += 0.4;
            kneeRight_j.theta -= 0.4;

            shoulderLeft_j.zTheta += 6;
            shoulderRight_j.zTheta -= 6;
            shoulderLeft_j.yTheta -= 0.8;
            shoulderRight_j.yTheta += 0.8;

            cameraX -= 0.02;
            cameraZ += 0.01;
            console.log(cameraX, cameraZ);
        }
        else{

            dancing = false;
            dance_descent = false;
        }

    }

}

function sway(){

    //순서대로
    if(!sway_descent){

        if(waist_j.theta < 25){
            waist_j.theta += 1;
            head_j.theta += 1;
            shoulderLeft_j.xTheta += 1;
            shoulderRight_j.xTheta -= 1;
            thighLeft_j.theta += 0.4;
            thighRight_j.theta -= 0.4;
            kneeLeft_j.theta += 0.4;
            kneeRight_j.theta -= 0.4;
        }
        else{
            sway_descent = true;
        }
        
    }//역순으로
    else{

        if(waist_j.theta > -25){
    
            waist_j.theta -= 1;
            head_j.theta -= 1;
            shoulderLeft_j.xTheta -= 1;
            shoulderRight_j.xTheta += 1;
            thighLeft_j.theta -= 0.4;
            thighRight_j.theta += 0.4;
            kneeLeft_j.theta -= 0.4;
            kneeRight_j.theta += 0.4;
        }
        else{
            sway_count += 1;
            if(sway_count > 2){
                swaying = false;
                dance_descent = true;
                dancing = true;
            }
            sway_descent = false;
        }

    }
}