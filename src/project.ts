import {Code} from '@motion-canvas/2d';
import {makeProject} from '@motion-canvas/core';
import './global.css';
import {python} from './highlighters.js';
import {scenes} from './scenes/index.js';

Code.defaultHighlighter = python;

export default makeProject({
	scenes,
	variables: {lang: import.meta.env.VITE_LANG === 'fa' ? 'fa' : 'en'},
});
