declare module 'bidi-js' {
	function closingToOpeningBracket(char: string): string;
	/**
	 * @param {string} char
	 * @return {number}
	 */
	function getBidiCharType(char: string): number;
	function getBidiCharTypeName(char: string): string;
	function getCanonicalBracket(char: string): string;
	/**
	 * @typedef {object} GetEmbeddingLevelsResult
	 * @property {{start, end, level}[]} paragraphs
	 * @property {Uint8Array} levels
	 */
	/**
	 * This function applies the Bidirectional Algorithm to a string, returning the resolved embedding levels
	 * in a single Uint8Array plus a list of objects holding each paragraph's start and end indices and resolved
	 * base embedding level.
	 *
	 * @param {string} string - The input string
	 * @param {"ltr"|"rtl"|"auto"} [baseDirection] - Use "ltr" or "rtl" to force a base paragraph direction,
	 *        otherwise a direction will be chosen automatically from each paragraph's contents.
	 * @return {GetEmbeddingLevelsResult}
	 */
	function getEmbeddingLevels(
		string: string,
		baseDirection?: 'ltr' | 'rtl' | 'auto',
	): {
		paragraphs: Array<{
			start: number;
			end: number;
			level: number;
		}>;
		levels: Uint8Array;
	};
	function getMirroredCharacter(char: string): string;
	/**
	 * Given a string and its resolved embedding levels, build a map of indices to replacement chars
	 * for any characters in right-to-left segments that have defined mirrored characters.
	 * @param string
	 * @param embeddingLevels
	 * @param [start]
	 * @param [end]
	 * @return {Map<number, string>}
	 */
	function getMirroredCharactersMap(
		string: string,
		embeddingLevels: {
			paragraphs: Array<{
				start: number;
				end: number;
				level: number;
			}>;
			levels: Uint8Array;
		},
		start?: number,
		end?: number,
	): Map<number, string>;
	/**
	 * Given a start and end denoting a single line within a string, and a set of precalculated
	 * bidi embedding levels, produce a list of segments whose ordering should be flipped, in sequence.
	 * @param {string} string - the full input string
	 * @param {GetEmbeddingLevelsResult} embeddingLevelsResult - the result object from getEmbeddingLevels
	 * @param {number} [start] - first character in a subset of the full string
	 * @param {number} [end] - last character in a subset of the full string
	 * @return {number[][]} - the list of start/end segments that should be flipped, in order.
	 */
	function getReorderSegments(
		string: string,
		embeddingLevelsResult: {
			paragraphs: Array<{
				start: number;
				end: number;
				level: number;
			}>;
			levels: Uint8Array;
		},
		start?: number,
		end?: number,
	): number[][];
	/**
	 * @param {string} string
	 * @param {GetEmbeddingLevelsResult} embedLevelsResult
	 * @param {number} [start]
	 * @param {number} [end]
	 * @return {number[]} an array with character indices in their new bidi order
	 */
	function getReorderedIndices(
		string: string,
		embedLevelsResult: {
			paragraphs: Array<{
				start: number;
				end: number;
				level: number;
			}>;
			levels: Uint8Array;
		},
		start?: number,
		end?: number,
	): number[];
	/**
	 * @param {string} string
	 * @param {GetEmbeddingLevelsResult} embedLevelsResult
	 * @param {number} [start]
	 * @param {number} [end]
	 * @return {string} the new string with bidi segments reordered
	 */
	function getReorderedString(
		string: string,
		embedLevelsResult: {
			paragraphs: Array<{
				start: number;
				end: number;
				level: number;
			}>;
			levels: Uint8Array;
		},
		start?: number,
		end?: number,
	): string;
	function openingToClosingBracket(char: string): string;
	function bidiFactory(): {
		closingToOpeningBracket: typeof closingToOpeningBracket;
		getBidiCharType: typeof getBidiCharType;
		getBidiCharTypeName: typeof getBidiCharTypeName;
		getCanonicalBracket: typeof getCanonicalBracket;
		getEmbeddingLevels: typeof getEmbeddingLevels;
		getMirroredCharacter: typeof getMirroredCharacter;
		getMirroredCharactersMap: typeof getMirroredCharactersMap;
		getReorderSegments: typeof getReorderSegments;
		getReorderedIndices: typeof getReorderedIndices;
		getReorderedString: typeof getReorderedString;
		openingToClosingBracket: typeof openingToClosingBracket;
	};
	export = bidiFactory;
}
