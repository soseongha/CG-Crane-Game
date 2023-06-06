"use strict";
var gl; //gl은 WEBGL context object이다

/*---전역변수로 사용할 것들---*/
//matrix 
var modelViewMatrixLoc;
var projectionMatrixLoc;
var modelViewMatrix = mat4();
// var eye = vec3(0.0,0.0,1.0);
// var at = vec3(0.0,0.0,0.0);
// var up = vec3(0.0,0.1,0.0);
// modelViewMatrix = mult(modelViewMatrix, lookAt(eye, at, up)); //viewing
var projectionViewMatrix = perspective(100, 1, 0, 1);

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
var torsoHeight = 0.3;
var torsoX = 0.0;
var leftCraneAngle = [[0,0,0],[0,0,0],[0,0,0]];
var rightCraneAngle = [[0,0,0],[0,0,0],[0,0,0]];
projectionViewMatrix[3][3] = 1;
var upperCraneSteamScale = {x: 0.7, y: 25, z: 0.7};
var craneSteamScale = {x: 0.7, y: 0.6, z: 0.6};
var lowerCraneSteamScale = {x: 0.7, y: 0.25, z:  1.0};
var craneTorso = {x: 0.2, y: 0.35, z:  0.2};
var lowerCraneTorsoScale = {x: 0.5, y: 0.15, z:  0.3};
var upperCraneScale = {x:4, y: 2, z:  1.0};
var mediumCraneScale = {x: 2, y: 0.2, z: 1.0};
var lowerCrane = {x: 3, y: 0.9, z:  1.0};
var craneAngle=[20,70,70];

var humanTorso = {w: 25, h:25, d:10}; //width, height, depth를 뜻함
var humanHead = {w: 20, h:20, d:20};
var humanUpperArm = {w: 5, h:15, d:10};
var humanLowerArm = {w: 5, h:15, d:10};
var humanPelvis = {w: 25, h:15, d:10};
var humanThigh = {w: 10, h:15, d:10};
var humanCalf = {w: 10, h:15, d:10};
var humanFoot = {w: 10, h:5, d:15};

var humanAngle = []

var drag = false;
var redraw = false;
var x,y;
var lastX = 512, lastY=512;
var dx = 0, dy = 0;
var theta = 0, phi = 0;

var red = false;
var blue = false;
var green = false;
var isReturn = false;


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
        red = !red;
    };

    document.getElementById("Blue").onclick = function(){
        blue = !blue;
    };

    document.getElementById("Green").onclick = function(){
        green = !green;
    };

    /*------verctices 생성하기------*/
   
    //var vertices = crane_vertices.concat(human_vertices);
    //var normals = crane_normals.concat(human_normals);

    
    var vertices = box_vertices.concat(crane_vertices);
    vertices = vertices.concat(human_vertices);
    // vertices = vertices.concat(humanHead);
    var normals = box_normals.concat(crane_normals);
    normals = normals.concat(human_normals);
   
    console.log(vertices)
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
    

    //make node tree



    /**
     * 
     * 
     */

     console.log(vertices);


    render();
};


var temp = modelViewMatrix;
var cur_vertex = 0

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );


    if(red){
        if(!isReturn)
        {
            if(torsoHeight>=0.1)
                torsoHeight -= 0.001;
            else
                isReturn = true;
        }else{
            if(torsoHeight<=0.3)
                torsoHeight += 0.001;
            else
            {
                red = false;
                isReturn = false;

            }
                
        }
        

    }

    if(blue){
        console.log("Blue")
        if(!isReturn)
        {
            if(torsoX<=0.5){
                torsoX += 0.001;
            }else{
                if(torsoHeight>=0.1)
                    torsoHeight -= 0.001;
                else
                    isReturn = true;
            }
            
        }else{
            if(torsoHeight<=0.3)
                torsoHeight += 0.001;
            else{
                if(torsoX>=0)
                    torsoX -= 0.001;
                else
                {
                    blue = false;
                    isReturn = false;
                }
                    
            }        
           
            
        }
    }

    if(green){
        console.log("Green")
        if(!isReturn)
        {
            if(torsoX>= -0.5){
                torsoX -= 0.001;
            }else{
                if(torsoHeight>=0.1)
                    torsoHeight -= 0.001;
                else
                    isReturn = true;
            }
            
        }else{
            if(torsoHeight<=0.3)
                torsoHeight += 0.001;
            else{
                if(torsoX<=0)
                    torsoX += 0.001;
                else
                {
                    green = false;
                    isReturn = false;
                }
                    
            }
            
           
            
        }
    }

    if(redraw){
        //change camera view
        var cameraMatrix = mat4();

        dx = 0.05 *(lastX-x);
        dy = 0.05 *(lastY-y);
        theta += dx;
        phi += dy;

        cameraMatrix = translate(0, 0, -0.2);
        cameraMatrix = mult(cameraMatrix, rotateY(theta));
        cameraMatrix = mult(cameraMatrix, rotateX(phi));
        modelViewMatrix = inverse4(cameraMatrix);
        
        var eye = vec3(modelViewMatrix[0][3], modelViewMatrix[1][3], modelViewMatrix[2][3]);
        modelViewMatrix = lookAt(eye,vec3(0,0,0),vec3(0,1,0));
        temp = modelViewMatrix;

        lastX = x;
        lastY = y;
        redraw = false;
    }else{
        //load camera view
        modelViewMatrix = temp;
    }

    changeColor(vec4(0.7, 0.8, 0.8, 1.0));
    var m = mat4();
    m = mult(m, translate(0.7, -0.7, 0.2));
    m = mult(m, scalem(0.15, 0.15, 0.1));
    m = mult(modelViewMatrix, m);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(m));
    drawButton();
    console.log(cur_vertex)
    changeColor(vec4(0.0, 0.0, 0.2, 1.0));
    for(var i = 0; i<numNodes; i++)
        figure = initNodes(i, figure);

    traverse(0);


    // cur_vertex = drawHumanTorso(cur_vertex);//함수 들어갔다 오면, cur_vetex는 humanTorso의 vertex 수만큼 더해져 나옴
    // cur_vertex = drawHumanHead(cur_vertex);

    // gl.drawArrays( gl.TRIANGLES, 0, 768);
    // cur_vertex = drawHumanTorso(cur_vertex);//함수 들어갔다 오면, cur_vetex는 humanTorso의 vertex 수만큼 더해져 나옴
    // cur_vertex = drawHumanHead(cur_vertex);
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