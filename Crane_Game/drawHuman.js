
function drawHumanTorso() {
    var i = cur_vertex;
    var s = scalem(humanTorso.w,humanTorso.h,humanTorso.d); //몸통의 크기는 20x40x15
    var instanceMatrix = mult(translate(0,45,0), s); //몸통의 위치는 (0,10,0)
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
    gl.drawArrays(gl.TRIANGLES, i, 60);

    cur_vertex = i + 60;
    return ;

}

function drawHumanHead() {
    var i = cur_vertex;
    var s = scalem(humanHead.w,humanHead.h,humanHead.d); 
    var instanceMatrix = mult(translate(0,55,0), s); 
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
    gl.drawArrays(gl.TRIANGLES, i, 768);
    cur_vertex = i + 768;
    return ;

}

function drawHumanUpperArmLeft() {
    var i = cur_vertex;
    var s = scalem(5,15,10); 
    var instanceMatrix = mult(translate(-30,25,0), s); 
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
    gl.drawArrays(gl.TRIANGLES, i, 60);

    cur_vertex = i + 60;
    return;

}

function drawHumanLowerArmLeft() {
    var i = cur_vertex;
    var s = scalem(5,15,10); 
    var instanceMatrix = mult(translate(-30,-6,0), s); 
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
    gl.drawArrays(gl.TRIANGLES, cur_vertex, 36);
    cur_vertex = i;
    return;

}


function drawHumanUpperArmRight() {
    var i = cur_vertex;
    var s = scalem(5,15,10); 
    var instanceMatrix = mult(translate(30,25,0), s); 
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
    gl.drawArrays(gl.TRIANGLES, cur_vertex, 60);
    cur_vertex = i;
    return;

}

function drawHumanLowerArmRight() {
    var i = cur_vertex;
    var s = scalem(5,15,10); 
    var instanceMatrix = mult(translate(30,-6,0), s); 
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
    gl.drawArrays(gl.TRIANGLES, cur_vertex, 36);
    cur_vertex = i;
    return;

}

function drawHumanPelvis() {
    var i = cur_vertex;
    var s = scalem(25,15,10); 
    var instanceMatrix = mult(translate(0,-20,0), s); 
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
    gl.drawArrays(gl.TRIANGLES, cur_vertex, 72);
    cur_vertex = i;
    return;

}

function drawHumanThighLeft() {
    var i = cur_vertex;
    var s = scalem(10,15,10); 
    var instanceMatrix = mult(translate(-13,-50,0), s); 
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
    gl.drawArrays(gl.TRIANGLES, cur_vertex, 36);
    cur_vertex = i;
    return;

}

function drawHumanCalfLeft() {
    var i = cur_vertex;
    var s = scalem(10,15,10); 
    var instanceMatrix = mult(translate(-13,-81,0), s); 
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
    gl.drawArrays(gl.TRIANGLES, cur_vertex, 36);
    cur_vertex = i;
    return;

}


function drawHumanFootLeft() {
    var i = cur_vertex;
    var s = scalem(10,5,15); 
    var instanceMatrix = mult(translate(-13,-90,5), s); 
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
    gl.drawArrays(gl.TRIANGLES, cur_vertex, 36);
    cur_vertex = i;
    return;

}

function drawHumanThighRight() {
    var i = cur_vertex;
    var s = scalem(10,15,10); 
    var instanceMatrix = mult(translate(13,-50,0), s); 
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
    gl.drawArrays(gl.TRIANGLES, cur_vertex, 36);
    cur_vertex = i;
    return;

}

function drawHumanCalfRight() {
    var i = cur_vertex;
    var s = scalem(10,15,10); 
    var instanceMatrix = mult(translate(13,-81,0), s); 
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
    gl.drawArrays(gl.TRIANGLES, cur_vertex, 36);
    cur_vertex = i;
    return;

}


function drawHumanFootRight() {
    var i = cur_vertex;
    var s = scalem(10,5,15); 
    var instanceMatrix = mult(translate(13,-90,5), s); 
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
    gl.drawArrays(gl.TRIANGLES, cur_vertex, 36);
    cur_vertex = i;
    return;

}
