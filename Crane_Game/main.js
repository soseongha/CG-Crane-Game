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
var torsoZ = 0.0;
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
var craneAngle=[10,70,60];

//human length
var humanTorso = {w: 25, h:25, d:10}; //width, height, depth를 뜻함
var humanHead = {w: 20, h:20, d:20};
var humanUpperArm = {w: 5, h:15, d:10};
var humanLowerArm = {w: 10, h:30, d:10};
var humanPelvis = {w: 25, h:15, d:10};
var humanThigh = {w: 10, h:15, d:10};
var humanCalf = {w: 10, h:15, d:10};
var humanFoot = {w: 10, h:5, d:15};

//human angles
var head_j = {theta: 0, axis: vec3(1,1,0)}; //ball-and-socket joint
var shoulderLeft_j = {xTheta: 0, yTheta: 0, zTheta:-30}; //ball-and-socket joint
var shoulderRight_j = {xTheta: 0, yTheta: 0, zTheta:30}; //ball-and-socket joint
var elbowLeft_j = {theta: 60}; //hinji joint
var elbowRight_j = {theta: -60}; //hinji joint
var waist_j = {theta: 0, axis: vec3(0,-1,0)}; //ball-and-socket joint
var thighLeft_j = {theta: 0, axis: vec3(1,0,0)}; //ball-and-socket joint
var thighRight_j = {theta: 0, axis: vec3(1,0,0)}; //ball-and-socket joint
var kneeLeft_j = {theta: 0}; //hinji joint
var kneeRight_j = {theta: 0}; //hinji joint
var ankleLeft_j = {theta: 0, axis: vec3(1,1,0)}; //ball-and-socket joint
var ankleRight_j = {theta: 0, axis: vec3(1,1,0)}; //ball-and-socket joint
 
//move viewing
var drag = false;
var redraw = false;
var x,y;
var lastX = 512, lastY=512;
var dx = 0, dy = 0;
var theta = 0, phi = 0;

//camera position
var cameraX = 0.0;
var cameraY = 0.0;
var cameraZ = 0.1;

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

    //scrollbar delete
    //document.body.style.overflow = "hidden";

    //crane manufacture
    window.addEventListener("keydown", (e) => {

        var labelX = document.getElementById("torsoX");
        var labelZ = document.getElementById("torsoZ");

        if(e.key == 32 || e.key == "Spacebar" || e.key == " ") {
            console.log("spacebar down");
            moving = true;
            judging = true;
        }
        else if(e.key == 37 || e.key == "ArrowRight") {
            if(torsoX < 10){
                torsoX += 0.1;
            }
        }
        else if(e.key == 39 || e.key == "ArrowLeft") {
            if(torsoX > -10){
                torsoX -= 0.1;
            }
        }
        else if(e.key == 38 || e.key == "ArrowUp") {
            if(torsoZ > -5){
                torsoZ -= 0.1;
            }
        }
        else if(e.key == 40 || e.key == "ArrowDown") {
            if(torsoZ < 0){
                torsoZ += 0.1;
            }
        }
        labelX.innerText = torsoX;
        labelZ.innerText = torsoZ;
    });

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



function render() {
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    //camera
    var cameraMatrix = mat4();
    cameraMatrix = translate(cameraX, cameraY, cameraZ);
    cameraMatrix = mult(cameraMatrix, rotateY(theta));
    cameraMatrix = mult(cameraMatrix, rotateX(phi));
    modelViewMatrix = inverse4(cameraMatrix);
    

    // var eye = vec3(modelViewMatrix[0][3], modelViewMatrix[1][3], modelViewMatrix[2][3]);
    // var
    // modelViewMatrix = lookAt(eye,vec3(0,0,0),vec3(0,1,0));

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

    if(moving){
        moveCrane();
    }
    
    if(ballMoved.red && ballMoved.green && ballMoved.blue){
        dancing = true;
        ballMoved.red = false;
        ballMoved.green = false;
        ballMoved.blue = false;
    }

    if(dancing){
        dance();
    }
    if(swaying){
        sway();
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
    modelViewMatrix = mult(modelViewMatrix, scalem(0.005, 0.005, 0.002));
    drawBall_1();
    changeColor(vec4(0.0,1.0, 0.0, 1.0));
    drawBall_2();
    changeColor(vec4(1.0, 0.0, 0.0, 1.0));
    drawBall_3();
    modelViewMatrix = old_modelViewMatrix;

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

    //node init
    for(var i = 0; i<numNodes; i++)
    figure = initNodes(i, figure);

    //human rendering
    changeColor(vec4(0.9, 0.2, 0.7, 1.0));
    modelViewMatrix = old_modelViewMatrix;
    modelViewMatrix = mult(modelViewMatrix, scalem(0.01, 0.01, 0.01));
    modelViewMatrix = mult(modelViewMatrix, scalem(0.2, 0.2, 0.2));
    modelViewMatrix = mult(modelViewMatrix, translate(350, -70, 0));
    traverse(11);
    modelViewMatrix = old_modelViewMatrix;

    //crane rendering
    changeColor(vec4(0.0, 0.0, 0.2, 1.0));
    
    m = scalem(0.07, 0.07, 0.07);
    modelViewMatrix = mult(modelViewMatrix, m);
    traverse(0);

    //reset cur_vertex
    cur_vertex = 0;
    window.requestAnimationFrame(render);
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
