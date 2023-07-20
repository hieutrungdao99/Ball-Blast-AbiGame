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

export function circleCollision(objA, objB) {
    const distanceX = objA.x - objB.x;
    const distanceY = objA.y - objB.y;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < objA.radius + objB.radius) {
        return true;
    } else {
        return false;
    }
}