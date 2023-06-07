function drawUpperCrane(){
    var s = scalem(UC.x,UC.y,UC.z);
    var t = mult(modelViewMatrix, s);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t))

    i = cur_vertex;
    for(var j=0; j<6; j++)
    {
        gl.drawArrays(gl.TRIANGLE_STRIP, i, 4);
        i = i+4;
    }
    cur_vertex = i;
    return;
}
function drawMediumCrane(){
    var s = scalem(MC.x,MC.y,MC.z);
    var t = mult(modelViewMatrix, s);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t))
    i = cur_vertex;
    for(var j=0; j<6; j++)
    {
        gl.drawArrays(gl.TRIANGLE_STRIP, i, 4);
        i = i+4;
    }
    cur_vertex = i;
    return;
}

function drawLowerCrane(){
    var s = scalem(LC.x,LC.y,LC.z);
    var t = mult(modelViewMatrix, s);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t))
    i = cur_vertex;

    gl.drawArrays(gl.TRIANGLE_STRIP, i, 4);
    i = i+4;

    for(var j=0; j<4; j++)
    {
        gl.drawArrays(gl.TRIANGLES, i, 3);
        i = i+3;
    }

    cur_vertex = i;
    return;
}

function drawLowerCraneTorso(){
    var s = scalem(LCT.x,LCT.y,LCT.z);
    var t = mult(modelViewMatrix, s);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t))
    i = cur_vertex;
    for(var j=0; j<6; j++)
    {
        gl.drawArrays(gl.TRIANGLE_FAN, i, 4);
        i = i+4;
    }
    cur_vertex = i;
    return;
}

function drawCraneTorso(){
    var s = scalem(CT.x,CT.y,CT.z);
    var t = mult(modelViewMatrix, s);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
    i = cur_vertex;
    gl.drawArrays(gl.TRIANGLE_FAN, i ,8);
    i += 8;
 
    for(var j =0; j<3;j++)
    {
        gl.drawArrays(gl.TRIANGLE_FAN, i ,10); 
        i += 10;
    }

    gl.drawArrays(gl.TRIANGLE_FAN, i,8);
    i+=8; 
    cur_vertex = i;
    
    return;
}

function drawCraneStream(){
    var s = scalem(CS.x,CS.y,CS.z);
    var t = mult(modelViewMatrix, s);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t))
    i = cur_vertex;
    for(var j=0; j<6; j++)
    {
        gl.drawArrays(gl.TRIANGLE_FAN, i, 4);
        i = i+4;
    }
    cur_vertex = i;
    return;
}

function drawUpperCraneStream(){
    var s = scalem(UCS.x,UCS.y,UCS.z);
    var t = mult(modelViewMatrix, s);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t))
    i = cur_vertex;
    for(var j=0; j<6; j++)
    {
        gl.drawArrays(gl.TRIANGLE_FAN, i, 4);
        i = i+4;
    }
    cur_vertex = i;
    return;
}

function drawLowerCraneStream(){
    var s = scalem(LCS.x,LCS.y,LCS.z);
    var t = mult(modelViewMatrix, s);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t))
    i = cur_vertex;
    gl.drawArrays(gl.TRIANGLE_FAN, i, 8);
    i +=8;

    for(var j=0; j<6; j++)
    {
        gl.drawArrays(gl.TRIANGLE_STRIP, i, 4);
        i = i+4;
    }

    gl.drawArrays(gl.TRIANGLE_FAN, i, 8);
    i+=8;
    cur_vertex = i;
    return ;
}
