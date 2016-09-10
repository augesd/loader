import { createLocal } from '../create/local';
import { isLoader } from './constructor';
import loaderPrototype from './prototype';

function foo (input) {
    console.info('core.foo', input);
}

export {
    foo,
    isLoader,
    createLocal,
    loaderPrototype
};
