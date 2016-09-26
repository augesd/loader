import isUndefined from '../utils/is-undefined';

export default (resource, key, values) => {
    let _error = (msg) => {
            //throw new Error(msg);
            console.error(msg);
            return null;
        },
        _get = () => resource.get(key),
        _set = () => {
            resource.set(key, values);
            return resource.get(key);
        }
    ;

    if (key) {
        if (isUndefined(values)) {
            return _get();
        } else {
            return _set();
        }
    }

    return _error('Wrong key: '+key);
}
