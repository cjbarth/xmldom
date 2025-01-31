'use strict';

const { replaceNonTextChars } = require('xmltest');

/**
 * Generate minimal snapshot representation by not adding empty lists to the
 * snapshots.
 *
 * @param actual {string | undefined | {toString: function(): string}}
 * @param errors {[ErrorLevel, string][]}
 * @param expected {string?} (optional) compared to actual-only added to output if different
 * @returns {{actual?: string} & Partial<Record<ErrorLevel, string[]>>}
 */
const generateSnapshot = (actual, errors, expected) => {
	const actualForSnapshot = replaceNonTextChars(actual);
	const expectedForSnapshot = replaceNonTextChars(expected);
	const result = {
		actual: actualForSnapshot,
	};
	if (expectedForSnapshot && actualForSnapshot !== expectedForSnapshot) {
		result.expected = expectedForSnapshot;
	}
	if (errors.length) {
		result.errors = errors;
	}
	return result;
};

module.exports = {
	generateSnapshot,
};
