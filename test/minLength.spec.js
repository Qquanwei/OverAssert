import { expect } from 'chai';
import { minLength } from '../src';

describe('minLength Spec', () => {

    it ('should be a function', () => {
        expect(minLength).to.be.instanceOf(Function);
    })

    it ('should return a function when apply', () => {
        expect(minLength(10)).to.be.instanceOf(Function);
    })

    it ('should return true when length > minLength', () => {
        const min = minLength(3);

        expect(min('abc')).to.be.equals(true);
        expect(min('abcd')).to.be.equals(true);
        expect(min(1234)).to.be.equals(true);
        expect(min(123)).to.be.equals(true);
    })

    it ('should be return false when length < minLength', () => {
        const min = minLength(3);

        expect(min('ab')).to.be.equals(false);
        expect(min(12)).to.be.equals(false);
        expect(min(null)).to.be.equals(false);
        expect(min(undefined)).to.be.equals(false);
        expect(min({})).to.be.equals(false);
    })
})
