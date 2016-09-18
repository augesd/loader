export { hooks, setHookCallback };

var hookCallback;

function hooks () {
    return hookCallback.apply(null, arguments);
}

// This is done to register the method called with wgm()
// without creating circular dependencies.
function setHookCallback (callback) {
    hookCallback = callback;
}
