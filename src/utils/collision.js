export function AABBCollision(objA, objB) {
    if (
        objA.x < objB.x + objB.width &&
        objA.x + objA.width > objB.x &&
        objA.y + objA.height > objB.y &&
        objA.y < objB.y + objB.height
    ) {
        return true;
    } else {
        return false;
    }
}
