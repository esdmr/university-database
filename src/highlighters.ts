import * as python_ from '@lezer/python';
import * as yaml_ from '@lezer/yaml';
import * as sql_ from '@codemirror/lang-sql';
import {LezerHighlighter} from '@motion-canvas/2d';

export const python = new LezerHighlighter(python_.parser);
export const yaml = new LezerHighlighter(yaml_.parser);
export const sql = new LezerHighlighter(sql_.MySQL.language.parser);
