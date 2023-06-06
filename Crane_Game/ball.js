
/*공의 base vector들: 4개의 vertex*/
var ball_base = [

    vec3(0,0,-1),
    vec3(0,0.942809,0.333333),
    vec3(-0.816497,-0.471405,0.333333),
    vec3(0.816497,-0.471405,0.333333),

]

/*공: n=3이면 768개의 vertex*/
//tetrahedron()을 호출하면 제대로 된 머리 vertex들이 head[]에 push됨
var ball_1 = []
var ball_2 = []
var ball_3 = []
var normal_ball_1 = []
var normal_ball_2 = []
var normal_ball_3 = []
var numTimesToSubdivide_ball = 3;
tetrahedron(ball_1,normal_ball_1,ball_base[0],ball_base[1],ball_base[2],ball_base[3],numTimesToSubdivide_ball)
tetrahedron(ball_2,normal_ball_2,ball_base[0],ball_base[1],ball_base[2],ball_base[3],numTimesToSubdivide_ball)
tetrahedron(ball_3,normal_ball_3,ball_base[0],ball_base[1],ball_base[2],ball_base[3],numTimesToSubdivide_ball)

/*공 vertex 생성 함수들*/
function tetrahedron(array,normal, a, b, c, d, n){
    divideTriangle(array,normal,a,b,c,n);
    divideTriangle(array,normal,d,c,b,n);
    divideTriangle(array,normal,a,d,b,n);
    divideTriangle(array,normal,a,c,d,n);
}

function divideTriangle(array,normal,a,b,c,count){
    if(count > 0){
        var ab = normalize(mix(a,b,0.5), true);
        var ac = normalize(mix(a,c,0.5), true);
        var bc = normalize(mix(b,c,0.5), true);
        divideTriangle(array,normal,a,ab,ac,count-1);
        divideTriangle(array,normal,ab,b,bc,count-1);
        divideTriangle(array,normal,bc,c,ac,count-1);
        divideTriangle(array,normal,ab,bc,ac,count-1);
    }
    else{
        triangle(array,normal,a,b,c);
    }
}

function triangle(array,normal,a,b,c){

    //sphere에서 normal은 vertex와 같음
    normal.push(vec3(a));
    normal.push(vec3(b));
    normal.push(vec3(c));

    array.push(vec3(a));
    array.push(vec3(b));
    array.push(vec3(c));
}
