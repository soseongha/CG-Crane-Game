
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
            figure[0] = createNode(m, drawCraneTorso, null, 1);
            break;

        case 1: //lowerCraneStream
            m = mult(m, translate(0.0, CT.y/2 + LCS.y/2, 0.0));
            figure[1] = createNode(m, drawLowerCraneStream, 4, 2); //4 sibling
            break;
        
        case 2: //craneStream
            m = mult(m, translate(0.0, LCS.y/2 + CS.y/2, 0.0));
            figure[2] = createNode(m, drawCraneStream, null, 3);
            break;

        case 3: //upperCraneStream
            m = mult(m, translate(0.0, CS.y + UCS.y, 0.0));
            figure[3] = createNode(m, drawUpperCraneStream, null, null);
            break;

        case 4: //lowerCraneTorso
            m = mult(m, translate(0.0, -CT.y/2-LCT.y, 0.0));
            figure[4] = createNode(m, drawLowerCraneTorso, null, 5);
            break;

        case 5: //leftUpperCrane
            var transx = - 0.6 * UC.x - LCT.x; //LCT를 빼준거에서 half * UC x scale에서 \
            var transy  = -LCT.y/2-0.6*Math.sin(craneAngle[0]*Rad)/2;
            m = mult(m, translate(transx,transy, 0.0));
            m = mult(m, subtractViewing());
            m = mult(m, rotateZ(craneAngle[0]));
            m = mult(m, addViewing());
            figure[5] = createNode(m, drawUpperCrane, 8, 6);
            break;

        case 6: //leftMediumCrane
            var x = -1.2 * Math.cos(craneAngle[0]*Rad) - 0.6 * Math.sin(craneAngle[1]*Rad)*UC.y;
            var y = -0.7*(Math.sin(craneAngle[0]*Rad))- 1.2 * Math.cos(craneAngle[1]*Rad)*UC.x;
            m = mult(m, subtractViewing());
            m = mult(m, translate(x, y, 0.0));
            m = mult(m, rotateZ(craneAngle[1]));
            m = mult(m, addViewing());
            figure[6] = createNode(m, drawMediumCrane, null, 7);
            break;

        case 7: //leftLowerCrane
            var x = - 0.6*(Math.cos(craneAngle[1]*Rad)+ MC.x);
            var y = - 1.2*(Math.sin(craneAngle[1]*Rad)) - 0.3 * (Math.sin(craneAngle[2]*Rad));
            m = mult(m, subtractViewing());
            m = mult(m, translate(x, y, 0.0));
            m = mult(m, rotateZ(craneAngle[2]));
            m = mult(m, addViewing());
            figure[7] = createNode(m, drawLowerCrane, null, null);
            break;
        case 8: //rightUpperCrane
            var transx = - 0.6 * UC.x - LCT.x; //LCT를 빼준거에서 half * UC x scale에서 \
            var transy  = -LCT.y/2-0.6*Math.sin(craneAngle[0]*Rad)/2;
            m = mult(m, translate(-transx,transy, 0.0));
            m = mult(m, subtractViewing());
            m = mult(m, rotateZ(-craneAngle[0]));
            m = mult(m, addViewing());
            figure[8] = createNode(m, drawUpperCrane, null, 9);
            break;

        case 9: //rightMediumCrane
            var x = -1.2 * Math.cos(craneAngle[0]*Rad) - 0.6 * Math.sin(craneAngle[1]*Rad)*UC.y;
            var y = -0.7*(Math.sin(craneAngle[0]*Rad))- 1.2 * Math.cos(craneAngle[1]*Rad)*UC.x;
            m = mult(m, subtractViewing());
            m = mult(m, translate(-x, y, 0.0));
            m = mult(m, rotateZ(-craneAngle[1]));
            m = mult(m, addViewing());

            figure[9] = createNode(m, drawMediumCrane, null, 10);
            break;
        
        case 10: //rightlowerCrane
            var x = - 0.6*(Math.cos(craneAngle[1]*Rad)+ MC.x);
            var y = - 1.2*(Math.sin(craneAngle[1]*Rad)) - 0.3 * (Math.sin(craneAngle[2]*Rad));
            m = mult(m, subtractViewing());
            m = mult(m, translate(-x, y, 0.0));
            m = mult(m, rotateZ(-craneAngle[2]));
            m = mult(m, addViewing());
            figure[10] = createNode(m, drawLowerCrane, null, null);
            break;

        
        /*human redering start*/
        case 11: //humanTorso
            m = mult(m, translate(0, 0, 0));
            figure[11] = createNode(m, drawHumanTorso, null, 12);
            break;

        case 12: //humanHead
            m = mult(m, translate(0,humanTorso.h,0));
            m = mult(m, translate(0,humanHead.h,0));
            figure[12] = createNode(m, drawHumanHead, 13, null);
            break;

        case 13: //humanUpperArmLeft
            m = mult(m, translate(-humanTorso.w,humanTorso.h,0));
            m = mult(m, translate(-humanUpperArm.w,-humanUpperArm.h,0));
            figure[13] = createNode(m, drawHumanUpperArmLeft, 14, 15);
            break;            
        
        case 14: //humanUpperArmRight
            m = mult(m, translate(humanTorso.w,humanTorso.h,0));
            m = mult(m, translate(humanUpperArm.w,-humanUpperArm.h,0));
            figure[14] = createNode(m, drawHumanUpperArmRight, 17, 16);
            break;            
        
        case 15: //humanLowerArmLeft
            m = mult(m, translate(0,-humanUpperArm.h,0));
            m = mult(m, translate(0,-humanLowerArm.h,0));
            figure[15] = createNode(m, drawHumanLowerArmLeft, null, null);
            break;            
        
        case 16: //humanLowerArmRight
            m = mult(m, translate(0,-humanUpperArm.h,0));
            m = mult(m, translate(0,-humanLowerArm.h,0));
            figure[16] = createNode(m, drawHumanLowerArmRight, null, null);
            break;            
        
        case 17: //humanPelvis
            m = mult(m, translate(0,-humanTorso.h,0));
            m = mult(m, translate(0,-humanPelvis.h,0));
            figure[17] = createNode(m, drawHumanPelvis, null, 18);
            break;            
        
        case 18: //humanThighLeft
            m = mult(m, translate(-humanPelvis.w,-humanPelvis.h,0));
            m = mult(m, translate(humanThigh.w,-humanThigh.h,0));
            figure[18] = createNode(m, drawHumanThighLeft, 19, 20);
            break;            
        
        case 19: //humanThighRight
            m = mult(m, translate(humanPelvis.w,-humanPelvis.h,0));
            m = mult(m, translate(-humanThigh.w,-humanThigh.h,0));
            figure[19] = createNode(m, drawHumanThighRight, null, 21);
            break;            
        
        case 20: //humanCalfLeft
            m = mult(m, translate(0,-humanThigh.h,0));
            m = mult(m, translate(0,-humanCalf.h,0));
            figure[20] = createNode(m, drawHumanCalfLeft, null, 22);
            break;   
            
        case 21: //humanCalfRight
            m = mult(m, translate(0,-humanThigh.h,0));
            m = mult(m, translate(0,-humanCalf.h,0));
            figure[21] = createNode(m, drawHumanCalfRight, null, 23);
            break;    
        
        case 22: //humanFootLeft
            m = mult(m, translate(0,-humanCalf.h,humanCalf.d));
            m = mult(m, translate(0,-humanFoot.h,-humanFoot.d));
            figure[22] = createNode(m, drawHumanFootLeft, null, null);
            break;    
            
        case 23: //humanFootRight
            m = mult(m, translate(0,-humanCalf.h,humanCalf.d));
            m = mult(m, translate(0,-humanFoot.h,-humanFoot.d));
            figure[23] = createNode(m, drawHumanFootRight, null, null);
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


function subtractViewing(){
    var result = mat4();
    result = rotateX(-phi);
    result = mult(result,rotateY(-theta));

    return result;
}

function addViewing(){
    var result = mat4();
    result = rotateX(phi);
    result = mult(result,rotateY(theta));

    return result;
}