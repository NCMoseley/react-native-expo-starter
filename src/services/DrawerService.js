let _func = null;

/**
 * @param root
 */
function setFunction(root) {
    _func = root;
}

/**
 */
function open() {
    _func();
}

export default {
    open,
    setFunction
};