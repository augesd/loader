import { Manager } from './constructor';

var proto = Manager.prototype;

//import { locale, localeData, lang } from './locale';
// ...
// import { foo, bar } from './foo-bar';
// ...

function bar (input = 'someone') {
	console.info('prototype.bar', input);
}

//proto.locale     = locale;
//proto.localeData = localeData;
// proto.foo        = foo;
proto.protoBar        = bar;
proto.protoBar2       = (input = 'someone') => `prototype.bar2, ${input}!`;

//// Other
//import { OtherOne, OtherTwo } from '../other/some';
//proto.one = OtherOne;
//proto.two = OtherTwo;

//// Deprecations
//import { deprecate } from '../utils/deprecate';
//proto.someDeprecated  = deprecate('someDeprecated accessor is deprecated. Use OtherOne instead.', OtherOne);

export default proto;
