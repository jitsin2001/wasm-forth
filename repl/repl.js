import * as WasmForth from '../src/index';

let loadingElement = document.getElementById('loading');
let inputElement = document.getElementById('input');
let sourceInputElement = document.getElementById('source-input');
let enterElement = document.getElementById('enter');
let outputElement = document.getElementById('output');

function onInputLine(evt) {
    if (evt.keyCode === 13) {
        evt.preventDefault();
        processLine();
    }
}

function processLine() {
    let line = sourceInputElement.value;

    outputElement.innerText += line + ' ';
    sourceInputElement.value = '';

    WasmForth.source(line + '\n');

    sourceInputElement.focus();
}

WasmForth.boot({
    wasmURL: 'dist/kernel.wasm',
    sources: ['dist/core.f', 'dist/vdom.f'],
    write: (text) => {
        outputElement.innerText += text;
        outputElement.scrollTop = outputElement.scrollHeight;
    }
}).then(() => {
    sourceInputElement.addEventListener('keypress', onInputLine);
    enterElement.addEventListener('click', processLine);

    loadingElement.parentElement.removeChild(loadingElement);
    inputElement.removeAttribute('style');
    sourceInputElement.focus();
});
