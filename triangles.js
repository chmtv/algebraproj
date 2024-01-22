// Utilities
class PointR3 {
    constructor(x,y,z) {
        this.x=x;
        this.y=y;
        this.z=z;
    }
}

function CrossProductR3(vec1, vec2) {
    let x = vec1.y*vec2.z - vec1.z*vec2.y;
    let y = -(vec1.x*vec2.z - vec1.z*vec2.x);
    let z = vec1.x*vec2.y - vec1.y*vec2.x;
    return new PointR3(x,y,z);
}

function AreColinear(vec1,vec2) {
    let returnVal = true;
    let crossProduct = CrossProductR3(vec1,vec2);
    if(crossProduct.x == 0 && crossProduct.y == 0 && crossProduct.z == 0) {
        return true;
    }
    else {
        return false;
    }
    return returnVal;
}

function DistBtwnPointsR3(vec1, vec2) {
    return Math.sqrt(
        (vec1.x-vec2.x) * (vec1.x-vec2.x) +  
        (vec1.y-vec2.y) * (vec1.y-vec2.y) +  
        (vec1.z-vec2.z) * (vec1.z-vec2.z)
    );
}
function determinantSize2(topLeft, topRight, bottomLeft, bottomRight) {
    return topLeft*bottomRight - topRight*bottomLeft;
}
function vectorBtwnPointsR3(p1,p2) {
    return new PointR3(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);
}
function triangleAreaFromPointsR3(p1,p2,p3) {
    let vec1 = new PointR3(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);
    let vec2 = new PointR3(p3.x - p1.x, p3.y - p1.y, p3.z - p1.z);

    let crossProduct = CrossProductR3(vec1,vec2);
    let magnitude = Math.sqrt(crossProduct.x*crossProduct.x + crossProduct.y * crossProduct.y + crossProduct.z * crossProduct.z);
    return magnitude * 0.5;
    // let W = p1.x*p2.y*p3.z + p2.x*p3.y * p1.z + p3.x * p1.y*p2.z -
    //         p1.z * p2.y * p3.x - p2.z * p3.y * p1.x * p3.z * p1.y * p2.x;
    
}
function angleBtwnVectorsR3(vec1, vec2) {
    let dotProduct = vec1.x*vec2.x + vec1.y*vec2.y + vec1.z*vec2.z;
    let magnitude1 = Math.sqrt(vec1.x*vec1.x + vec1.y*vec1.y + vec1.z*vec1.z);
    let magnitude2 = Math.sqrt(vec2.x*vec2.x + vec2.y*vec2.y + vec2.z*vec2.z);

    let arccosineInput = dotProduct/(magnitude1*magnitude2);
    return Math.acos(arccosineInput);
}
function radToDeg(radians) {
    return radians * 180 / Math.PI;
}
function getTriangleHeight(area, sideLength) {
    return 2 * area / sideLength;
}




// Triangle logic
function getTriangleNumberFromForm(coordName) {
    return Number(document.getElementsByName(`triangleCoord${coordName}`)[0].value);
}
function handleTriangleCoordsSubmit() {
    let x1 = getTriangleNumberFromForm("1X");
    let y1 = getTriangleNumberFromForm("1Y");
    let z1 = getTriangleNumberFromForm("1Z");
    let vec1 = new PointR3(x1,y1,z1);

    let x2 = getTriangleNumberFromForm("2X");
    let y2 = getTriangleNumberFromForm("2Y");
    let z2 = getTriangleNumberFromForm("2Z");
    let vec2 = new PointR3(x2,y2,z2);

    let x3 = getTriangleNumberFromForm("3X");
    let y3 = getTriangleNumberFromForm("3Y");
    let z3 = getTriangleNumberFromForm("3Z");
    let vec3 = new PointR3(x3,y3,z3);

    let resultHTML = ""
    // Check if a triangle can be made
    if(AreColinear(vec1,vec2) && AreColinear(vec2,vec3) && AreColinear(vec1,vec3)) {
        resultHTML = "Podane współrzędne są współliniowe, nie można stworzyć z nich trójkąta";
    }
    else {
        resultMsg = "Poniżej wypisane są wartości pewnych parametrów trójkąta stworzonego z podanych punktów"
        // Triangle side lengths
        let AB = DistBtwnPointsR3(vec1, vec2);
        let AC = DistBtwnPointsR3(vec1, vec3);
        let BC = DistBtwnPointsR3(vec2, vec3);
        document.getElementById("triangleSideLengths").innerHTML = 
        `Długości boków trójkąta: </br> |AB|=${AB} </br> |AC|=${AC} </br> |BC|=${BC}`;
        // Triangle area
        let area = triangleAreaFromPointsR3(vec1,vec2,vec3);
        document.getElementById("triangleArea").innerHTML = `Pole trójkąta: ${area}`
        // Angles of the triangle
        let angleCAB = angleBtwnVectorsR3(vectorBtwnPointsR3(vec1,vec3), vectorBtwnPointsR3(vec1,vec2));
        let angleABC = angleBtwnVectorsR3(vectorBtwnPointsR3(vec3,vec2), vectorBtwnPointsR3(vec1,vec2));
        let angleBCA = angleBtwnVectorsR3(vectorBtwnPointsR3(vec1,vec3), vectorBtwnPointsR3(vec2,vec3));
        document.getElementById("triangleAngles").innerHTML = `Kąt CAB: ${angleCAB} (${radToDeg(angleCAB)} stopni) </br> Kąt ABC: ${angleABC} (${radToDeg(angleABC)} stopni)</br> Kąt BCA: ${angleBCA} (${radToDeg(angleBCA)} stopni)`;

        if(radToDeg(angleABC) == 90) {
            document.getElementById("triangleHeights").innerHTML = `Trójkąt jest prostokątny, co oznacza że ma tylko jedną wysokość (wychodzącą z AC): ${getTriangleHeight(area, AC)}`;
        }
        else if(radToDeg(angleBCA) == 90) {
            document.getElementById("triangleHeights").innerHTML = `Trójkąt jest prostokątny, co oznacza że ma tylko jedną wysokość (wychodzącą z AB): ${getTriangleHeight(area, AB)}`;
        }
        else if(radToDeg(angleCAB) == 90) {
            document.getElementById("triangleHeights").innerHTML = `Trójkąt jest prostokątny, co oznacza że ma tylko jedną wysokość (wychodzącą z BC): ${getTriangleHeight(area, BC)}`;
        }
        else {
            document.getElementById("triangleHeights").innerHTML = `Wysokości trójkąta: </br> z AC: ${getTriangleHeight(area, AC)} </br> z AB: ${getTriangleHeight(area, AC)} </br> z BC: ${getTriangleHeight(area, BC)}`;
        }
    }



    document.getElementById("trianglesMsg").innerHTML = resultHTML;
}