"use strict";

var gl; //gl은 WEBGL context object이다

/*---전역변수로 사용할 것들---*/
//matrix 
var modelViewMatrixLoc;
var projectionMatrixLoc;
var modelViewMatrix = scalem(0.01,0.01,0.01); //0.5,0.5,0.5
var projectionViewMatrix = perspective(100, 1, 0, 1);

/**-------------------------- */

window.onload = function init() 
{
    var canvas = document.getElementById( "gl-canvas" ); //html에서 canvas를 가져옴

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); } //WebGL Cotext를 가져옴

    
    /*------verctices 생성하기------*/
    //var vertices = humanHead.concat(humanTorso);
    //var normals = normal_humanHead.concat(normal_humanTorso);
    var vertices = humanTorso.concat(humanHead);
    var normals = normal_humanTorso.concat(normal_humanHead);
    //var normals =initNormal();
    /*------------------------------*/

    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1., 1., 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // 버퍼에 선언했던 점들을 넘기는 단계
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.DYNAMIC_DRAW ); 

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    //Normal vector
    var noramalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, noramalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(normals), gl.STATIC_DRAW);

    var vNormal = gl.getAttribLocation( program, "vNormal" );
    gl.vertexAttribPointer( vNormal, 4 , gl.FLOAT, false, 0, 0 );
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

    /**
     * 
     * 
     */
    console.log(vertices);
    render();
};



function render() {
    
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    //gl.drawArrays( gl.TRIANGLES, 0, 768);
    var cur_vertex = 0; //현재 몇 번째 vertex까지 draw했는지 체크하기 위한 변수
    cur_vertex = drawHumanTorso(cur_vertex);//함수 들어갔다 오면, cur_vetex는 humanTorso의 vertex 수만큼 더해져 나옴
    cur_vertex = drawHumanHead(cur_vertex);
    

    window.requestAnimationFrame(render);
}
