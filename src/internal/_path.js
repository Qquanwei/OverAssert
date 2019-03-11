function path(pathArray, obj) {
    return pathArray.reduce((root, prop) => {
        return root && root[prop];
    }, Object.assign({}, obj));
}

export default path;
