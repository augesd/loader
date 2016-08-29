import {
	hooks as loader,
	setHookCallback
} from './lib/utils/hooks';

loader.version = '1.0.0';

import {
	isLoader,
	loaderPrototype as fn
} from './lib/core/main';

export default loader;