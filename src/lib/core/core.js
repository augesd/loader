import { getInstance } from '../create/by-default';
import { is } from './constructor';
import proto from './prototype';

function foo (input = 'someValue') {
    console.info(`core.foo, ${input}!`);
}

export {
    foo,
    is,
    getInstance,
    proto
};
