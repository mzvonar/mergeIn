function mergeValue(context, value) {
    const contextType = Object.prototype.toString.call(context);
    const valueType = Object.prototype.toString.call(value);

    if(contextType !== valueType) {
        throw new Error('Cannot merge ' + valueType + ' into ' + contextType);
    }

    if(contextType === '[object Array]') {
        return [].concat(context, value);
    }
    else if(contextType === '[object Object]') {
        return Object.assign({}, context, value);
    }
    else {
        throw new Error('Cannot merge ' + valueType + ' into ' + contextType);
    }
}

function mergeInRecursive(context, path, value) {
    var valueType = Object.prototype.toString.call(value);
    if(valueType !== '[object Object]' && valueType !== '[object Array]') {
        throw new Error('value has to be either Object or Array');
    }

    if(!path) {
        return mergeValue(context, value);
    }

    if(typeof path === 'string') {
        path = [path];
    }

    var currentPathPart = path.shift();

    if(typeof currentPathPart === 'undefined' || currentPathPart === null) {
        throw new Error('Path part is undefined');
    }

    if(!context) {
        context = isNaN(currentPathPart) ? {} : [];
    }

    var currentValue = path.length === 0 ? mergeValue(context[currentPathPart] || (isNaN(currentPathPart) ? {} : []), value) : mergeInRecursive(context[currentPathPart], path, value);

    var contextType2 = Object.prototype.toString.call(context);
    if(contextType2 === '[object Array]') {
        var copy = [].concat(context);
        copy[currentPathPart] = currentValue;
        return copy;
    }
    else if(contextType2 === '[object Object]') {
        var newValue = {};
        newValue[currentPathPart] = currentValue;

        return Object.assign({}, context, newValue);
    }
    else {
        throw new Error('Trying to add property to ' + contextType2);
    }
}

/**
 * Merges value with value in path. If path does not exist it is created
 * @param {Object} context
 * @param {Array|string} path
 * @param {*} value
 * @return {Object}
 */
module.exports = function mergeIn(context, path, value) {
    if(!value) {
        value = path;
        path = undefined;
    }

    if(!context) {
        throw new Error('Context is falsy.');
    }

    return mergeInRecursive(context, path, value);
};