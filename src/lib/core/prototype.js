import { loader } from './constructor';

var proto = loader.prototype;

import { locale, localeData, lang } from './locale';
// ...
// import { foo, bar } from './foo-bar';
// ...

proto.locale            = locale;
proto.localeData        = localeData;
// proto.foo        = foo;
// proto.bar        = bar;

//// Other
//import { OtherOne, OtherTwo } from '../other/some';
//proto.one = OtherOne;
//proto.two = OtherTwo;

//// Deprecations
//import { deprecate } from '../utils/deprecate';
//proto.someDeprecated  = deprecate('someDeprecated accessor is deprecated. Use OtherOne instead.', OtherOne);

export default proto;
