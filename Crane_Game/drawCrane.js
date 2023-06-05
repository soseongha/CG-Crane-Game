function drawCrane(i){
    for(var j=0; j<6; j++)
    {
        gl.drawArrays(gl.TRIANGLE_STRIP, i, 4);
        i = i+4;
    }
    modelViewMatrix = stack.pop();
    modelViewMatrix = mult(modelViewMatrix, translate(-2.5, -3, 0.0));
    stack.push(modelViewMatrix);
    modelViewMatrix = mult(modelViewMatrix, rotateZ(craneAngle[1]));
    modelViewMatrix = mult(modelViewMatrix, scalem(mediumCrane.x,mediumCrane.y,mediumCrane.z));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    for(var j=0; j<6; j++)
    {
        gl.drawArrays(gl.TRIANGLE_STRIP, i, 4);
        i = i+4;
    }

    modelViewMatrix = stack.pop();
    modelViewMatrix = mult(modelViewMatrix, translate(1, -2, 0));
    modelViewMatrix = mult(modelViewMatrix, rotateY(180))
    modelViewMatrix = mult(modelViewMatrix, rotateZ(craneAngle[2]))
    modelViewMatrix = mult(modelViewMatrix, scalem(lowerCrane.x,lowerCrane.y,lowerCrane.z));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    gl.drawArrays(gl.TRIANGLE_STRIP, i, 4);
    i = i+4;

    for(var j=0; j<4; j++)
    {
        gl.drawArrays(gl.TRIANGLES, i, 3);
        i = i+3;
    }

    return i;
}

function drawLowerCraneTorso(i){
    for(var j=0; j<6; j++)
    {
        gl.drawArrays(gl.TRIANGLE_FAN, i, 4);
        i = i+4;
    }
    return i;
}

function drawCraneTorso(i){
    gl.drawArrays(gl.TRIANGLE_FAN, i ,8);
    i += 8;
 
    for(var j =0; j<3;j++)
    {
        gl.drawArrays(gl.TRIANGLE_FAN, i ,10); 
        i += 10;
    }

    gl.drawArrays(gl.TRIANGLE_FAN, i,8);
    i+=8; 
    return i;
}

function drawCraneStream(i){
    for(var j=0; j<6; j++)
    {
        gl.drawArrays(gl.TRIANGLE_FAN, i, 4);
        i = i+4;
    }
        
    return i;
}

function drawUpperCraneStream(i){
    for(var j=0; j<6; j++)
    {
        gl.drawArrays(gl.TRIANGLE_FAN, i, 4);
        i = i+4;
    }
       
    return i;
}

function drawLowerCraneStream(i){
    gl.drawArrays(gl.TRIANGLE_FAN, i, 8);
    i +=8;

    for(var j=0; j<6; j++)
    {
        gl.drawArrays(gl.TRIANGLE_STRIP, i, 4);
        i = i+4;
    }

    gl.drawArrays(gl.TRIANGLE_FAN, i, 8);
    i+=8;
    return i;
}
