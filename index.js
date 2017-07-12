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

/**
 * Gets value from object by path. If any part of path is undefined it returns undefined or defaultValue if provided
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

    var valueType = Object.prototype.toString.call(value);
    if(valueType !== '[object Object]' && valueType !== '[object Array]') {
        throw new Error('value has to be either Object or Array');
    }

    if(!path) {
        var contextType = Object.prototype.toString.call(context);
        if(contextType === '[object Array]') {
            return [].concat(context, value);
        }
        else if(contextType === '[object Object]') {
            return Object.assign({}, context, value);
        }
        else {
            throw new Error('Trying to add property to ' + contextType);
        }
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

    var currentValue = path.length === 0 ? mergeValue(context[currentPathPart], value) : mergeIn(context[currentPathPart], path, value);

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
};