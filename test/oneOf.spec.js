import { expect } from 'chai';
import { oneOf } from '../src';

describe('oneOf Spec', () => {

    it ('should be a function', () => {
        expect(oneOf).to.be.instanceOf(Function);
    })

    it ('should be return a function when apply', () => {
        expect(oneOf([])).to.be.instanceOf(Function);
    })

    it ('should return true when oneOf item', () => {
        const item = {};
        const one = oneOf(['a', 1, item]);

        expect(one('a')).to.be.equals(true);
        expect(one(1)).to.be.equals(true);
        expect(one(item)).to.be.equals(true);
    })

    it ('should return false when not exists', () => {
        const item = {};
        const one = oneOf(['a', 1, item]);

        expect(one('ab')).to.be.equals(false);
        expect(one('1')).to.be.equals(false);
        expect(one({})).to.be.equals(false);
        expect(one(null)).to.be.equals(false);
        expect(one(undefined)).to.be.equals(false);
    })
})
