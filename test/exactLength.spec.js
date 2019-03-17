import { expect } from 'chai';
import { exactLength } from '../src';

describe('exactLength Spec', () => {

    it ('should be a function', () => {
        expect(exactLength).to.be.instanceOf(Function);
    })

    it ('should be return a function when apply', () => {
        expect(exactLength(0)).to.be.instanceOf(Function);
    })

    it ('should be return true when exact length', () => {
        const exa = exactLength(2);

        expect(exa(12)).to.be.equals(true);
        expect(exa('ab')).to.be.equals(true);
    })

    it ('should be return false when not exact length', () => {
        const exa = exactLength(2);

        expect(exa(-12)).to.be.equals(false);
        expect(exa(0)).to.be.equals(false);
        expect(exa('')).to.be.equals(false);
        expect(exa('abc')).to.be.equals(false);
        expect(exa(null)).to.be.equals(false);
        expect(exa(undefined)).to.be.equals(false);
    })
})
