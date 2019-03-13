import { expect } from 'chai';
import { maxLength } from '../src';

describe('maxLength Spec', () => {

    it ('should be a function', () => {
        expect(maxLength).to.be.instanceOf(Function);
    })

    it ('should return a function when apply', () => {
        expect(maxLength(2)).to.be.instanceOf(Function);
    })

    it ('should return true when length <= maxLength', () => {
        const max = maxLength(2);

        expect(max('ab')).to.be.equals(true);
        expect(max(12)).to.be.equals(true);
        expect(max('1')).to.be.equals(true);
    })

    it ('should return false when length > maxLength', () => {
        const max = maxLength(2);

        expect(max('abc')).to.be.equals(false);
        expect(max(123)).to.be.equals(false);
        expect(max(null)).to.be.equals(false);
        expect(max(undefined)).to.be.equals(false);
    })
})
