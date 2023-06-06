
function drawHumanTorso() {
    var i = cur_vertex
    var s = scalem(humanTorso.w,humanTorso.h,humanTorso.d); //몸통의 크기는 20x40x15
    var t = mult(modelViewMatrix, s);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
    gl.drawArrays(gl.TRIANGLES, i, 60);

    cur_vertex = i + 60;
    return ;

}

function drawHumanHead() {
    var i = cur_vertex
    var s = scalem(humanHead.w,humanHead.h,humanHead.d); 
    var t = mult(modelViewMatrix, s);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
    gl.drawArrays(gl.TRIANGLES, i, 768);
    cur_vertex = i + 768;
    return ;

}

function drawHumanUpperArmLeft() {
    var i = cur_vertex;
    var s = scalem(5,15,10); 
    var t = mult(modelViewMatrix, s);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
    gl.drawArrays(gl.TRIANGLES, i, 60);

    cur_vertex = i + 60;
    return;

}

function drawHumanLowerArmLeft() {
    var i = cur_vertex;
    var s = scalem(5,15,10); 
    var t = mult(modelViewMatrix, s);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
    gl.drawArrays(gl.TRIANGLES, cur_vertex, 36);
    cur_vertex = i + 36;
    return;

}


function drawHumanUpperArmRight() {
    var i = cur_vertex;
    var s = scalem(5,15,10); 
    var t = mult(modelViewMatrix, s);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
    gl.drawArrays(gl.TRIANGLES, cur_vertex, 60);
    cur_vertex = i + 60;
    return;

}

function drawHumanLowerArmRight() {
    var i = cur_vertex;
    var s = scalem(5,15,10); 
    var t = mult(modelViewMatrix, s);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
    gl.drawArrays(gl.TRIANGLES, cur_vertex, 36);
    cur_vertex = i + 36;
    return;

}

function drawHumanPelvis() {
    var i = cur_vertex;
    var s = scalem(25,15,10); 
    var t = mult(modelViewMatrix, s);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
    gl.drawArrays(gl.TRIANGLES, cur_vertex, 72);
    cur_vertex = i + 72;
    return;

}

function drawHumanThighLeft() {
    var i = cur_vertex;
    var s = scalem(10,15,10); 
    var t = mult(modelViewMatrix, s);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
    gl.drawArrays(gl.TRIANGLES, cur_vertex, 36);
    cur_vertex = i + 36;
    return;

}

function drawHumanCalfLeft() {
    var i = cur_vertex;
    var s = scalem(10,15,10); 
    var t = mult(modelViewMatrix, s);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
    gl.drawArrays(gl.TRIANGLES, cur_vertex, 36);
    cur_vertex = i + 36;
    return;

}


function drawHumanFootLeft() {
    var i = cur_vertex;
    var s = scalem(10,5,15); 
    var t = mult(modelViewMatrix, s);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
    gl.drawArrays(gl.TRIANGLES, cur_vertex, 36);
    cur_vertex = i + 36;
    return;

}

function drawHumanThighRight() {
    var i = cur_vertex;
    var s = scalem(10,15,10); 
    var t = mult(modelViewMatrix, s);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
    gl.drawArrays(gl.TRIANGLES, cur_vertex, 36);
    cur_vertex = i + 36;
    return;

}

function drawHumanCalfRight() {
    var i = cur_vertex;
    var s = scalem(10,15,10); 
    var t = mult(modelViewMatrix, s);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
    gl.drawArrays(gl.TRIANGLES, cur_vertex, 36);
    cur_vertex = i + 36;
    return;

}


function drawHumanFootRight() {
    var i = cur_vertex;
    var s = scalem(10,5,15); 
    var t = mult(modelViewMatrix, s);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
    gl.drawArrays(gl.TRIANGLES, cur_vertex, 36);
    cur_vertex = i + 36;
    return;

}
