import { hooks } from '../utils/hooks';
import hasOwnProp from '../utils/has-own-prop';
import isUndefined from '../utils/is-undefined';

// Plugins that add properties should also add the key here (null value),
// so we can properly clone ourselves.
var loaderProperties = hooks.loaderProperties = [];

export function copyConfig(to, from) {
    var i, prop, val;

    if (!isUndefined(from._isALoaderObject)) {
        to._isALoaderObject = from._isALoaderObject;
    }
    if (!isUndefined(from._locale)) {
        to._locale = from._locale;
    }

    if (loaderProperties.length > 0) {
        for (i in loaderProperties) {
            prop = loaderProperties[i];
            val = from[prop];
            if (!isUndefined(val)) {
                to[prop] = val;
            }
        }
    }

    return to;
}

var updateInProgress = false;

// Loader prototype object
export function Loader(config) {
    copyConfig(this, config);
    // Prevent infinite loop in some cases.
    if (updateInProgress === false) {
        updateInProgress = true;
        //hooks.doSomething(this);
        updateInProgress = false;
    }
}

export function isLoader (obj) {
    return obj instanceof Loader || (obj != null && obj._isALoaderObject != null);
}
