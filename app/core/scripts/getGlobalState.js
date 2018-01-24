/*
Find all the global values for the page, revealing mutatable state.
*/
export default `
const standardGlobals = ['top', 'window', 'location', 'external', 'chrome', 'document', 'inlineCSS', 'target', 'width', 'height', 'canvas', 'data', 'DOMURL', 'img', 'svg', 'ctx', 'url', 'w', 'a', 'speechSynthesis', 'webkitNotifications', 'localStorage', 'sessionStorage', 'applicationCache', 'webkitStorageInfo', 'indexedDB', 'webkitIndexedDB', 'crypto', 'CSS', 'performance', 'console', 'devicePixelRatio', 'styleMedia', 'parent', 'opener', 'frames', 'self', 'defaultstatus', 'defaultStatus', 'status', 'name', 'length', 'closed', 'pageYOffset', 'pageXOffset', 'scrollY', 'scrollX', 'screenTop', 'screenLeft', 'screenY', 'screenX', 'innerWidth', 'innerHeight', 'outerWidth', 'outerHeight', 'offscreenBuffering', 'frameElement', 'clientInformation', 'navigator', 'toolbar', 'statusbar', 'scrollbars', 'personalbar', 'menubar', 'locationbar', 'history', 'screen', 'postMessage', 'close', 'blur', 'focus', 'ondeviceorientation', 'ondevicemotion', 'onunload', 'onstorage', 'onresize', 'onpopstate', 'onpageshow', 'onpagehide', 'ononline', 'onoffline', 'onmessage', 'onhashchange', 'onbeforeunload', 'onwaiting', 'onvolumechange', 'ontimeupdate', 'onsuspend', 'onsubmit', 'onstalled', 'onshow', 'onselect', 'onseeking', 'onseeked', 'onscroll', 'onreset', 'onratechange', 'onprogress', 'onplaying', 'onplay', 'onpause', 'onmousewheel', 'onmouseup', 'onmouseover', 'onmouseout', 'onmousemove', 'onmouseleave', 'onmouseenter', 'onmousedown', 'onloadstart', 'onloadedmetadata', 'onloadeddata', 'onload', 'onkeyup', 'onkeypress', 'onkeydown', 'oninvalid', 'oninput', 'onfocus', 'onerror', 'onended', 'onemptied', 'ondurationchange', 'ondrop', 'ondragstart', 'ondragover', 'ondragleave', 'ondragenter', 'ondragend', 'ondrag', 'ondblclick', 'oncuechange', 'oncontextmenu', 'onclose', 'onclick', 'onchange', 'oncanplaythrough', 'oncanplay', 'oncancel', 'onblur', 'onabort', 'onwheel', 'onwebkittransitionend', 'onwebkitanimationstart', 'onwebkitanimationiteration', 'onwebkitanimationend', 'ontransitionend', 'onsearch', 'getSelection', 'print', 'stop', 'open', 'showModalDialog', 'alert', 'confirm', 'prompt', 'find', 'scrollBy', 'scrollTo', 'scroll', 'moveBy', 'moveTo', 'resizeBy', 'resizeTo', 'matchMedia', 'requestAnimationFrame', 'cancelAnimationFrame', 'webkitRequestAnimationFrame', 'webkitCancelAnimationFrame', 'webkitCancelRequestAnimationFrame', 'captureEvents', 'releaseEvents', 'atob', 'btoa', 'setTimeout', 'clearTimeout', 'setInterval', 'clearInterval', 'TEMPORARY', 'PERSISTENT', 'getComputedStyle', 'getMatchedCSSRules', 'webkitConvertPointFromPageToNode', 'webkitConvertPointFromNodeToPage', 'webkitRequestFileSystem', 'webkitResolveLocalFileSystemURL', 'openDatabase', 'addEventListener', 'removeEventListener', 'dispatchEvent']
const globals = {}
for (const w in window) {
  if (!standardGlobals.includes(w)) globals[w] = window[w]
}
console.warn(globals)
return globals
`
