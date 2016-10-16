// Side effect imports
import './prototype';

import { defaultInstance as currentInstance } from './by-default';

import dom from './dom';
import proxy from './proxy';
import translate from './translate';

export {
	currentInstance,
	dom,
	proxy,
	translate
};
