function drawUpperCrane(){
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
