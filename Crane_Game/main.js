"use strict";
var gl; //gl은 WEBGL context object이다

/*---전역변수로 사용할 것들---*/
//matrix 
var modelViewMatrixLoc;
var projectionMatrixLoc;
var modelViewMatrix = mat4();
var projectionViewMatrix = perspective(100, 1, 0, 1);
var cur_vertex = 0; //vertices idx

//shading
var lightPosition = vec4(1.0, 1.0, 1.0, 0.0);
var lightAmbient = vec4(0.3,0.5, 0.5, 1,0);
var lightDiffuse = vec4(1.0, 1.0, 1.0, 1.0);
var lightSpecular = vec4(1.0, 1.0, 1.0, 1.0);
var lightLoc;
var materialAmbient = vec4(1.0, 0.0, 1.0, 1.0);
var materialDiffuse = vec4(1.0, 0.8, 0.0, 1.0);
var materialSpecular = vec4(1.0, 0.8, 0.0, 1.0);
var materialShininess = 90.0;
var ambientProduct;
var diffuseProduct;
var specularProduct;
var drag = false;

//stack
var stack =[];
var figure = [];
/**-------------------------- */
 
//Crane
var torsoHeight = 10;
var torsoX = 0.0;
projectionViewMatrix[3][3] = 1;
var UCS = {x: 0.7, y: 25, z: 0.5};
var CS = {x: 1.5, y: 0.6, z: 1.2};
var LCS = {x: 1.5, y: 1, z:  1.0};
var CT = {x: 2, y: 3.5, z: 2};
var LCT = {x: 1, y: 0.5, z: 0.7};
var UC = {x:3, y: 1, z:  1.0};
var MC = {x: 2.5, y: 4/7, z: 1.0};
var LC = {x: 3, y: 0.9, z:  1.0};
var Rad = Math.PI/180;
var craneAngle=[10,70,75];

//human
var humanTorso = {w: 25, h:25, d:10}; //width, height, depth를 뜻함
var humanHead = {w: 20, h:20, d:20};
var humanUpperArm = {w: 5, h:15, d:10};
var humanLowerArm = {w: 5, h:15, d:10};
var humanPelvis = {w: 25, h:15, d:10};
var humanThigh = {w: 10, h:15, d:10};
var humanCalf = {w: 10, h:15, d:10};
var humanFoot = {w: 10, h:5, d:15};
var humanAngle = []

//move viewing
var drag = false;
var redraw = false;
var x,y;
var lastX = 512, lastY=512;
var dx = 0, dy = 0;
var theta = 0, phi = 0;

var red = false; //button true/false
var blue = false; //button true/false
var green = false; //button true/false
var isAscent = false; //after picking start ascent
var isdescent = false; //decsent at goal 
var goZero = false; //return zero

var figure = [];
var numNodes = 11 + 13;
for(var i = 0; i < numNodes; i++){
    figure[i] = createNode(null, null, null, null);
}


window.onload = function init() 
{   
    var canvas = document.getElementById( "gl-canvas" ); //html에서 canvas를 가져옴

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); } //WebGL Cotext를 가져옴

    canvas.addEventListener("mousemove", function(event){
        x = event.offsetX;
        y = event.offsetY;
        redraw = true;
    });

    document.getElementById("Red").onclick = function(){
        red = true;
    };

    document.getElementById("Blue").onclick = function(){
        blue = true;
    };

    document.getElementById("Green").onclick = function(){
        green = true;
    };

    /*------verctices 생성하기------*/

    var vertices = ball_vertices.concat(box_vertices);
    vertices = vertices.concat(human_vertices);
    vertices = vertices.concat(crane_vertices);

    var normals = ball_normals.concat(box_normals);
    normals = normals.concat(human_normals);
    normals = normals.concat(crane_normals);
   
    /*------------------------------*/

    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.8, 0.8, 0.9, 0.9);


    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    gl.enable(gl.DEPTH_TEST);
   
    //light, modelviewMatrix...
    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    projectionMatrixLoc = gl.getUniformLocation(program, "projectionMatrix");
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionViewMatrix));

    lightLoc = gl.getUniformLocation(program, "ambientProduct");
    calculateColor();
    gl.uniform4fv(lightLoc, flatten(ambientProduct));
    gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"), flatten(diffuseProduct));
    gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"), flatten(specularProduct));
    gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"), flatten(lightPosition));
    gl.uniform1f(gl.getUniformLocation(program, "shininess"), materialShininess);

    // 버퍼에 선언했던 점들을 넘기는 단계
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW ); 

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    //Normal vector
    var noramalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, noramalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(normals), gl.STATIC_DRAW);

    var vNormal = gl.getAttribLocation( program, "vNormal" );
    gl.vertexAttribPointer( vNormal, 3 , gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vNormal );

    /*canvas 사이즈 유지하기*/
    window.onresize = function() {
        var min = innerWidth;
        if ( innerHeight < min){
            min = innerHeight;
        }
        if(min < canvas.width || min < canvas.height){
            gl.viewport(0, canvas.height-min, min, min);
        }
    };
    

    render();
};


var isPicking = false; //is picking the ball
var isangle0 = false;
var isangle1 = false;
var isangle2 = false;

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    //camera
    var cameraMatrix = mat4();
    cameraMatrix = translate(0, 0, -0.2);
    cameraMatrix = mult(cameraMatrix, rotateY(theta));
    cameraMatrix = mult(cameraMatrix, rotateX(phi));
    modelViewMatrix = inverse4(cameraMatrix);
        
    var eye = vec3(modelViewMatrix[0][3], modelViewMatrix[1][3], modelViewMatrix[2][3]);
    modelViewMatrix = lookAt(eye,vec3(0,0,0),vec3(0,1,0));

    if(goZero){
        returnToZero();
    }

    if(red){
        redCrane();
    }



    if(blue){
        blueCrane();
    }

    if(green){
        greenCrane();
    }

    // if(redraw){
    //     //change camera view
        

    //     dx = 0.05 *(lastX-x);
    //     dy = 0.05 *(lastY-y);
    //     theta += dx;
    //     phi += dy;
        
    //     temp = modelViewMatrix;

    //     lastX = x;
    //     lastY = y;
    //     redraw = false;
    // }else{
    //     //load camera view
    //     modelViewMatrix = temp;
    // }

    //modelViewMatrix save
    var old_modelViewMatrix = modelViewMatrix;

    //three ball rendering
    changeColor(vec4(0.0, 0.0, 1.0, 1.0));
    modelViewMatrix = mult(modelViewMatrix, scalem(0.005, 0.005, 0.005));
    drawBall_1();
    changeColor(vec4(0.0,1.0, 0.0, 1.0));
    drawBall_2();
    changeColor(vec4(1.0, 0.0, 0.0, 1.0));
    drawBall_3();
    modelViewMatrix = old_modelViewMatrix;
    // console.log(cur_vertex) //2304 vertices

    //box rendering
    changeColor(vec4(0.9, 0.6, 0.2, 1.0));
    var m = mat4();
    m = mult(m, translate(0, -1, -1));
    m = mult(m, scalem(10, 0.2, 10));
    m = mult(modelViewMatrix, m);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(m));
    drawButton();
    changeColor(vec4(1.0, 1.0, 1.0, 1.0));

    var m = mat4();
    m = mult(m, translate(0.8, -0.5, 0.0));
    m = mult(m, scalem(0.2, 0.1, 0.2));
    m = mult(modelViewMatrix, m);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(m));
    drawButton();
    // console.log(cur_vertex) //24 vertices

    //node init
    for(var i = 0; i<numNodes; i++)
    figure = initNodes(i, figure);

    //human rendering
    changeColor(vec4(0.9, 0.2, 0.7, 1.0));
    modelViewMatrix = old_modelViewMatrix;
    modelViewMatrix = mult(modelViewMatrix, scalem(0.01, 0.01, 0.01));
    modelViewMatrix = mult(modelViewMatrix, scalem(0.4, 0.4, 0.4));
    modelViewMatrix = mult(modelViewMatrix, translate(100, -100, -150));
    traverse(11);
    modelViewMatrix = old_modelViewMatrix;
    // console.log(cur_vertex); //

    //crane rendering
    changeColor(vec4(0.0, 0.0, 0.2, 1.0));
    
    m = scalem(0.07, 0.07, 0.07);
    // m = mult(m, rotateY(20));
    modelViewMatrix = mult(modelViewMatrix, m);
    traverse(0);
    // console.log(cur_vertex); //286 vertices


    //reset cur_vertex
    cur_vertex = 0;
    window.requestAnimationFrame(render);
}

function returnToZero(){
    if(torsoHeight<10){
        torsoHeight += 0.1;
    }else{
        torsoHeight = 10;
        if(torsoX>0){
            torsoX -= 0.1;
        }else{
            torsoX = 0.0;
            goZero = false;
        }
    }
}
function calculateColor(){
    ambientProduct = mult(lightAmbient, materialAmbient);
    diffuseProduct = mult(lightDiffuse, materialDiffuse);
    specularProduct = mult(lightSpecular, materialSpecular);
}

function changeColor(color){
    materialAmbient = color;
    calculateColor();
    gl.uniform4fv(lightLoc, flatten(ambientProduct));
}

function redCrane(){
    if(!isAscent)
        {
            if(torsoX<3){
                torsoX += 0.1;
            }else{
                if(torsoHeight>1)
                    torsoHeight -= 0.1;
                else{
                    if(!isPicking)
                        moveCraneAngle()
                    else
                        isAscent = true;
                }    
            }
        }else{
            if(torsoHeight<10 && !isdescent)
                torsoHeight += 0.05;
            else
            {
                isdescent = true;
                if(torsoX<12)
                    torsoX += 0.05;
                else{
                    if(torsoHeight>2)
                        torsoHeight -= 0.1;
                    else
                        red = returnCraneAngle();
                }
            }
        }
}

function blueCrane(){
    if(!isAscent)
    {
        if(torsoX>-5){
            torsoX -= 0.1;
        }else{
            if(torsoHeight>1)
                torsoHeight -= 0.1;
            else{
                if(!isPicking)
                    moveCraneAngle()
                else
                    isAscent = true;
            }    
        }
    }else{
        if(torsoHeight<10 && !isdescent)
            torsoHeight += 0.05;
        else
        {
            isdescent = true;
            if(torsoX<12)
                torsoX += 0.05;
            else{
                if(torsoHeight>2)
                    torsoHeight -= 0.1;
                else
                    blue = returnCraneAngle();
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
                    moveCraneAngle()
                else
                    isAscent = true;
            }    
        }
    }else{
        if(torsoHeight<10 && !isdescent)
            torsoHeight += 0.05;
        else
        {
            isdescent = true;
            if(torsoX<12)
                torsoX += 0.05;
            else{
                if(torsoHeight>2)
                    torsoHeight -= 0.1;
                else
                    green = returnCraneAngle();
            }
        }
    }
}


function moveCraneAngle(){
    if(craneAngle[0]<20){
        craneAngle[0] += 0.1;
    }else{
        if(craneAngle[1]<75){
            craneAngle[1] += 0.1;
        }else{
            if(craneAngle[2]<70){
                craneAngle[2] += 0.1;
            }else{
                isPicking = true;
            }
        }
    }
}

function returnCraneAngle(){
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
                return false;
            }
        }
    }
    return true;
}