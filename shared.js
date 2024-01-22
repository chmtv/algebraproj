class PointR3 {
    x=0
    y=0
    z=0
    constructor(x,y,z) {
        this.x=x;
        this.y=y;
        this.z=z;
    }
}

function CrossProductR3(vec1, vec2) {
    let x = vec1.y*vec1.z - vec1.z*vec2.y;
    let y = -(vec1.x*vec2.z - vec1.z*vec2.x);
    let z = vec1.x*vec2.y - vec1.y*vec2.x;

    return new PointR3(x,y,z);
}

function AreColinear(vec1,vec2) {
    let returnVal = true;
    let crossProduct = CrossProductR3(vec1,vec2);
    if(crossProduct.x != 0) returnVal = false;
    if(crossProduct.y != 0) returnVal = false;
    if(crossProduct.z != 0) returnVal = false;

    return returnVal;
}