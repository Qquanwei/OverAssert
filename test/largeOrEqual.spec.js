import { expect } from 'chai';
import { largeOrEqual } from '../src';

describe('largeOrEqual Spec', () => {

    it ('should be a function', () => {
        expect(largeOrEqual).to.be.instanceOf(Function);
    })

    it ('should be return function when apply', () => {
        expect(largeOrEqual()).to.be.instanceOf(Function);
    })

    it ('should be return true when largeEqual', () => {
        const p = largeOrEqual(10);

        expect(p(10)).to.be.equals(true);
        expect(p(11)).to.be.equals(true);
    })

    it ('should be return false when not largeOrEqual', () => {
        const p = largeOrEqual(10);

        expect(p(9)).to.be.equals(false);
        expect(p(0)).to.be.equals(false);
        expect(p(null)).to.be.equals(false);
        expect(p(undefined)).to.be.equals(false);
        expect(p('')).to.be.equals(false);
    })

    it ('should be correct with not input', () => {
        const p = largeOrEqual(0);
        expect(p('')).to.be.equals(false);
        expect(p(null)).to.be.equals(false);
        expect(p(undefined)).to.be.equals(false);
    })
})
