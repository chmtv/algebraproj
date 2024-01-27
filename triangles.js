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
function DotProductR3(vec1, vec2) {
    return vec1.x*vec2.x + vec1.y*vec2.y + vec1.z*vec2.z;
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
    let dotProduct = DotProductR3(vec1,vec2);
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
    
    /*
    if(
        // AreColinear(vec1,vec2) && AreColinear(vec2,vec3) && AreColinear(vec1,vec3)
        triangleAreaFromPointsR3(vec1,vec2,vec3) == 0
        ) {
        resultHTML = "Podane współrzędne są współliniowe, nie można stworzyć z nich trójkąta";
    }
    */
    if(AreColinear(new PointR3(vec2.x-vec1.x,vec2.y-vec1.z,vec2.y-vec1.z),new PointR3(vec3.x-vec2.x,vec3.y-vec2.z,vec3.y-vec2.z))) {
        resultHTML = "Podane współrzędne są współliniowe, nie można stworzyć z nich trójkąta";
        document.getElementById("triangleSideLengths").innerHTML = "";
        document.getElementById("triangleArea").innerHTML = "";
        document.getElementById("triangleAngles").innerHTML = "";
        document.getElementById("triangleHeights").innerHTML = "";
    }
    else {
        resultMsg = "Poniżej wypisane są wartości pewnych parametrów trójkąta stworzonego z podanych punktów"
        // Triangle side lengths
        let AB = DistBtwnPointsR3(vec1, vec2);
        let AC = DistBtwnPointsR3(vec1, vec3);
        let BC = DistBtwnPointsR3(vec2, vec3);
        document.getElementById("triangleSideLengths").innerHTML = 
        `Długości boków trójkąta: </br> |AB|=${AB.toFixed(2)} </br> |AC|=${AC.toFixed(2)} </br> |BC|=${BC.toFixed(2)}`;
        // Triangle area
        let area = triangleAreaFromPointsR3(vec1,vec2,vec3);
        document.getElementById("triangleArea").innerHTML = `Pole trójkąta: ${area.toFixed(2)}`
        // Angles of the triangle
        let angleCAB = angleBtwnVectorsR3(vectorBtwnPointsR3(vec1,vec3), vectorBtwnPointsR3(vec1,vec2));
        let angleABC = angleBtwnVectorsR3(vectorBtwnPointsR3(vec3,vec2), vectorBtwnPointsR3(vec1,vec2));
        let angleBCA = angleBtwnVectorsR3(vectorBtwnPointsR3(vec1,vec3), vectorBtwnPointsR3(vec2,vec3));
        document.getElementById("triangleAngles").innerHTML = `Kąt CAB: ${angleCAB.toFixed(2)} (${radToDeg(angleCAB).toFixed(2)} stopni) </br> Kąt ABC: ${angleABC.toFixed(2)} (${radToDeg(angleABC).toFixed(2)} stopni)</br> Kąt BCA: ${angleBCA.toFixed(2)} (${radToDeg(angleBCA).toFixed(2)} stopni)`;

        if(radToDeg(angleABC) == 90) {
            document.getElementById("triangleHeights").innerHTML = `Trójkąt jest prostokątny, co oznacza że ma tylko jedną wysokość (wychodzącą z AC): ${getTriangleHeight(area, AC).toFixed(2)}`;
        }
        else if(radToDeg(angleBCA) == 90) {
            document.getElementById("triangleHeights").innerHTML = `Trójkąt jest prostokątny, co oznacza że ma tylko jedną wysokość (wychodzącą z AB): ${getTriangleHeight(area, AB).toFixed(2)}`;
        }
        else if(radToDeg(angleCAB) == 90) {
            document.getElementById("triangleHeights").innerHTML = `Trójkąt jest prostokątny, co oznacza że ma tylko jedną wysokość (wychodzącą z BC): ${getTriangleHeight(area, BC).toFixed(2)}`;
        }
        else {
            document.getElementById("triangleHeights").innerHTML = `Wysokości trójkąta: </br> z AC: ${getTriangleHeight(area, AC).toFixed(2)} </br> z AB: ${getTriangleHeight(area, AC).toFixed(2)} </br> z BC: ${getTriangleHeight(area, BC).toFixed(2)}`;
        }
    }

    document.getElementById("trianglesMsg").innerHTML = resultHTML;
}




    // Tetrahedron logic
    function getTetraCoordFromForm(coord) {
        return Number(document.getElementsByName(`tetraCoord${coord}`)[0].value);
    }
    function isR3Zero(vec) {
        return vec.x == 0 && vec.y == 0 && vec.z == 0;
    }
    function AreCoplanarThreePoints(vec1,vec2,vec3) {
        let crossProduct = CrossProductR3(vec2,vec3);
        let dotProduct = DotProductR3(vec1, crossProduct);
        return dotProduct == 0;
    }
    function AreCoplanarFourPoints(vec1,vec2,vec3,vec4) {
        let crossProduct = CrossProductR3(vectorBtwnPointsR3(vec1,vec2), vectorBtwnPointsR3(vec1,vec3));
        let dotProduct = DotProductR3(vectorBtwnPointsR3(vec1,vec4), crossProduct);
        return dotProduct == 0;
    }
    function formatPoint(p) {
        return `(${p.x}, ${p.y}, ${p.z})`;
    }
    function handleTetraSubmit() {
        let x1 = getTetraCoordFromForm("1X");
        let y1 = getTetraCoordFromForm("1Y");
        let z1 = getTetraCoordFromForm("1Z");
        let vec1 = new PointR3(x1,y1,z1);

        let x2 = getTetraCoordFromForm("2X");
        let y2 = getTetraCoordFromForm("2Y");
        let z2 = getTetraCoordFromForm("2Z");
        let vec2 = new PointR3(x2,y2,z2);

        let x3 = getTetraCoordFromForm("3X");
        let y3 = getTetraCoordFromForm("3Y");
        let z3 = getTetraCoordFromForm("3Z");
        let vec3 = new PointR3(x3,y3,z3);

        let x4 = getTetraCoordFromForm("4X");
        let y4 = getTetraCoordFromForm("4Y");
        let z4 = getTetraCoordFromForm("4Z");
        let vec4 = new PointR3(x4,y4,z4);

        let tetraVecs = [vec1,vec2,vec3,vec4];
        let tetraBaseVecs = [];
        let nonCoplanarVec;
        let canMakeTetra = false;
        for(let i = 0; i < tetraVecs.length; i++) {
            vec = tetraVecs[i];
            let vecsToCheck = [];
            nonCoplanarVec = null;
            for(let j = 0; j < tetraVecs.length; j++) {
                
                let _vec = tetraVecs[j];
                // Add all the vectors that are not the currently checked one to an array to be checked later
                if(i != j) {
                    vecsToCheck.push(_vec);  
                }
                // Also set a variable of the other vector for later calculations
                else {
                    nonCoplanarVec = _vec;
                }
                // If there is a base and a non-coplanar vector set all the variables, in the other case say a message
                if(vecsToCheck.length == 3 && nonCoplanarVec) {
                    // Check if in the 4 vectors there are 3 that make a base (are coplanar) and if the other vector is not coplanar
                    if(!AreCoplanarFourPoints(...vecsToCheck, nonCoplanarVec)) {
                        tetraBaseVecs = vecsToCheck;
                        canMakeTetra = true;
                        break;
                    }
                }
            }
            if(canMakeTetra) break;
        }
        if(!canMakeTetra) {
            document.getElementById("tetraMsg").innerHTML = "Wszystkie podane współrzędne są współpłaszczyznowe, nie można z nich utworzyć poprawnego czworościanu";
            document.getElementById("tetraArea").innerHTML = "";
            document.getElementById("tetraHeight").innerHTML = "";
            document.getElementById("tetraVolume").innerHTML = "";
            return;
        }
        // The tetrahedron parameters calculations
        document.getElementById("tetraMsg").innerHTML = "Poniżej wypisane są wartości parametrów czworościanu utworzonego z podanych wierzchołków";
        // Area
        let sideArea1 = triangleAreaFromPointsR3(tetraBaseVecs[0],tetraBaseVecs[2],nonCoplanarVec);
        let sideArea2 = triangleAreaFromPointsR3(tetraBaseVecs[0],tetraBaseVecs[1],nonCoplanarVec);
        let sideArea3 = triangleAreaFromPointsR3(tetraBaseVecs[1],tetraBaseVecs[2],nonCoplanarVec);
        let baseArea = triangleAreaFromPointsR3(...tetraBaseVecs);
        let totalArea = sideArea1 + sideArea2 + sideArea3 + baseArea;
        document.getElementById("tetraArea").innerHTML = `Pole powierzchni całkowitej: ${totalArea.toFixed(2)}`;
        // Volume
        let a = vectorBtwnPointsR3(tetraBaseVecs[0], tetraBaseVecs[1]);
        let b = vectorBtwnPointsR3(tetraBaseVecs[0], tetraBaseVecs[2]);
        let c = vectorBtwnPointsR3(tetraBaseVecs[0], nonCoplanarVec);
        let volume = 1/6 * Math.abs(
             DotProductR3(CrossProductR3(a,b), c)
            );
        document.getElementById("tetraVolume").innerHTML = `Objętość: ${volume.toFixed(2)}`;
        // Heights
        let tetraHeight = volume / 1/3 * baseArea;
        document.getElementById("tetraHeight").innerHTML = `Wysokość czworościanu opuszczona z wierzchołka ${formatPoint(nonCoplanarVec)}: ${tetraHeight.toFixed(2)} </br>`;
        
        tetraHeight = volume / 1/3 * triangleAreaFromPointsR3(tetraBaseVecs[0], tetraBaseVecs[2], nonCoplanarVec);
        document.getElementById("tetraHeight").innerHTML += `Wysokość czworościanu opuszczona z wierzchołka ${formatPoint(tetraBaseVecs[1])}: ${tetraHeight.toFixed(2)} </br>`;

        tetraHeight = volume / 1/3 * triangleAreaFromPointsR3(tetraBaseVecs[1], tetraBaseVecs[2], nonCoplanarVec);
        document.getElementById("tetraHeight").innerHTML += `Wysokość czworościanu opuszczona z wierzchołka ${formatPoint(tetraBaseVecs[0])}: ${tetraHeight.toFixed(2)} </br>`;

        tetraHeight = volume / 1/3 * triangleAreaFromPointsR3(tetraBaseVecs[0], tetraBaseVecs[1], nonCoplanarVec);
        document.getElementById("tetraHeight").innerHTML += `Wysokość czworościanu opuszczona z wierzchołka ${formatPoint(tetraBaseVecs[2])}: ${tetraHeight.toFixed(2)} </br>`;
        }
