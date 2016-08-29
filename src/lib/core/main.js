import { isLoader } from './constructor';
import loaderPrototype from './prototype';

function foo (input) {
    return input;
}

export {
    foo,
    isLoader,
    loaderPrototype
};
