
function traverse(Id){

    //id가 null이면 반환
    if(Id == null)
        return;
    
    //먼저 parent modelViewMatrix 저장
    stack.push(modelViewMatrix);

    //기존 modelViewMatrix에 transform 곱해주기
    modelViewMatrix = mult(modelViewMatrix, figure[Id].transform);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    //render 하기
    figure[Id].render();

    //child 탐색
    if(figure[Id].child != null)
        traverse(figure[Id].child);
    
    //sibling을 위해 pop
    modelViewMatrix = stack.pop();

    if(figure[Id].sibling != null)
        traverse(figure[Id].sibling);
    

}

function initNodes(Id, figure){
    var m = mat4();

    switch(Id){
        case 0: //CraneTorso
            m = mult(m, translate(torsoX, torsoHeight, 0.0));
            m = mult(m, scalem(craneTorso.x,craneTorso.y,craneTorso.z));
            figure[0] = createNode(m, drawCraneTorso, null, 1);
            break;

        case 1: //lowerCraneStream
            m = mult(m, translate(0.0, 1.5*craneTorso.y, 0.0));
            m = mult(m, scalem(lowerCraneSteamScale.x,lowerCraneSteamScale.y,lowerCraneSteamScale.z));
            figure[1] = createNode(m, drawLowerCraneStream, 4, 2); //4 sibling
            break;
        
        case 2: //craneStream
            m = mult(m, translate(0.0, 3.5*lowerCraneSteamScale.y, 0.0));
            m = mult(m, scalem(craneSteamScale.x,craneSteamScale.y,craneSteamScale.z));
            figure[2] = createNode(m, drawCraneStream, null, 3);
            break;

        case 3: //upperCraneStream
            m = mult(m, translate(0.0, 25, 0.0));
            m = mult(m, scalem(upperCraneSteamScale.x,upperCraneSteamScale.y,upperCraneSteamScale.z));
            figure[3] = createNode(m, drawUpperCraneStream, null, null);
            break;

        case 4: //lowerCraneTorso
            m = mult(m, translate(0.0, -1.7*craneTorso.y, 0.0));
            m = mult(m, scalem(lowerCraneTorsoScale.x,0.95*lowerCraneTorsoScale.y,lowerCraneTorsoScale.z));
            figure[4] = createNode(m, drawLowerCraneTorso, null, 5);
            break;

        case 5: //leftUpperCrane
            m = mult(m, translate(-3, -0.5, 0.0));
            m = mult(m, rotateZ(craneAngle[0]));
            m = mult(m, scalem(upperCraneScale.x,upperCraneScale.y,upperCraneScale.z));
            figure[5] = createNode(m, drawUpperCrane, 8, 6);
            break;

        case 6: //leftMediumCrane
            x = 2 * Math.cos(craneAngle[0]);
            y = 1.5 * Math.sin(craneAngle[0]);
            m = mult(m, translate(-x, -y, 0.0));
            m = mult(m, rotateZ(craneAngle[1]));
            m = mult(m, scalem(mediumCraneScale.x,mediumCraneScale.y,mediumCraneScale.z));
            figure[6] = createNode(m, drawMediumCrane, null, 7);
            break;

        case 7: //leftLowerCrane
            x = 1.5 * Math.cos(craneAngle[1]);
            y = 1.5 * Math.sin(craneAngle[1]);
            m = mult(m, translate(-x, -y, 0));
            m = mult(m, rotateZ(craneAngle[2]))
            m = mult(m, scalem(lowerCrane.x,lowerCrane.y,lowerCrane.z));
            figure[7] = createNode(m, drawLowerCrane, null, null);
            break;

        case 8: //rightUpperCrane
            m = mult(m, translate(3, -0.5, 0.0));
            m = mult(m, rotateZ(-craneAngle[0]));
            m = mult(m, scalem(upperCraneScale.x,upperCraneScale.y,upperCraneScale.z));
            figure[8] = createNode(m, drawUpperCrane, null, 9);
            break;

        case 9: //rightMediumCrane
            x = 2 * Math.cos(-craneAngle[0]);
            y = 1.5 * Math.sin(-craneAngle[0]);
            m = mult(m, translate(x, y, 0.0));
            m = mult(m, rotateZ(-craneAngle[1]));
            m = mult(m, scalem(mediumCraneScale.x,mediumCraneScale.y,mediumCraneScale.z));
            figure[9] = createNode(m, drawMediumCrane, null, 10);
            break;
        
        case 10: //rightlowerCrane
            x = 1.5 * Math.cos(-craneAngle[1]);
            y = 1.5 * Math.sin(-craneAngle[1]);
            m = mult(m, translate(x, y, 0));
            m = mult(m, rotateZ(-craneAngle[2]))
            m = mult(m, scalem(lowerCrane.x,lowerCrane.y,lowerCrane.z));
            figure[10] = createNode(m, drawLowerCrane, null, null);
            break;

        /*human redering start*/
        case 11: //humanTorso
            m = mult(m, translate(0, 0, 0));
            figure[10] = createNode(m, drawHumanTorso, null, 12);
            break;

        case 12: //humanHead
            m = mult(m, translate(0,humanTorso.h,0));
            figure[10] = createNode(m, drawHumanHead, 13, null);
            break;

        case 13: //humanUpperArmLeft
            m = mult(m, translate(-0.5 * humanTorso.w,0.5 * humanTorso.h,0));
            m = mult(m, translate(-0.5 * humanUpperArmLeft.w,-0.5 * humanUpperArmLeft,0));
            figure[10] = createNode(m, drawHumanUpperArmLeft, 14, 15);
            break;            
        
        case 14: //humanUpperArmRight
            m = mult(m, translate(0.5 * humanTorso.w,0.5 * humanTorso.h,0));
            m = mult(m, translate(0.5 * humanUpperArmLeft.w,-0.5 * humanUpperArmLeft,0));
            figure[10] = createNode(m, drawHumanUpperArmRight, 17, 16);
            break;            
        
        case 15: //humanLowerArmLeft
            m = mult(m, translate(0,-0.5 * humanUpperArm.h,0));
            m = mult(m, translate(0,-0.5 * humanLowerArm.h,0));
            figure[10] = createNode(m, drawHumanLowerArmLeft, null, null);
            break;            
        
        case 16: //humanLowerArmRight
            m = mult(m, translate(0,-0.5 * humanUpperArm.h,0));
            m = mult(m, translate(0,-0.5 * humanLowerArm.h,0));
            figure[10] = createNode(m, drawHumanLowerArmRight, null, null);
            break;            
        
        case 17: //humanPelvis
            m = mult(m, translate(0,-0.5 * humanTorso.h,0));
            m = mult(m, translate(0,-0.5 * humanPelvis.h,0));
            figure[10] = createNode(m, drawHumanPelvis, null, 18);
            break;            
        
        case 18: //humanThighLeft
            m = mult(m, translate(0,-0.5 * humanPelvis.h,0));
            m = mult(m, translate(0,-0.5 * humanThigh.h,0));
            figure[10] = createNode(m, drawHumanThighLeft, 19, 20);
            break;            
        
        case 19: //humanThighRight
            m = mult(m, translate(0,-0.5 * humanPelvis.h,0));
            m = mult(m, translate(0,-0.5 * humanThigh.h,0));
            figure[10] = createNode(m, drawHumanThighRight, null, 21);
            break;            
        
        case 20: //humanCalfLeft
            m = mult(m, translate(0,-0.5 * humanThigh.h,0));
            m = mult(m, translate(0,-0.5 * humanCalf.h,0));
            figure[10] = createNode(m, drawHumanCalfLeft, null, 22);
            break;   
            
        case 21: //humanCalfRight
            m = mult(m, translate(0,-0.5 * humanThigh.h,0));
            m = mult(m, translate(0,-0.5 * humanCalf.h,0));
            figure[10] = createNode(m, drawHumanCalfRight, null, 23);
            break;    
        
        case 22: //humanFootLeft
            m = mult(m, translate(0,-0.5 * humanCalf.h,0));
            m = mult(m, translate(0,-0.5 * humanFoot.h,0));
            figure[10] = createNode(m, drawHumanFootLeft, null, null);
            break;    
            
        case 23: //humanFootRight
            m = mult(m, translate(0,humanTorso.h,0));
            figure[10] = createNode(m, drawHumanFootRight, null, null);
            break;    
        
        default: break;

    }
    return figure;
}

function createNode(transform, render, sibling,child){
    var node = {
        transform: transform,
        render: render,
        sibling: sibling,
        child: child,
    }

    return node;
}