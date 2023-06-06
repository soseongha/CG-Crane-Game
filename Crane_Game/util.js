
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
