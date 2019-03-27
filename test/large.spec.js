import { large } from '../src';
import { expect } from 'chai';

describe('large Spec', () => {

    it ('should be a function', () => {
        expect(large).to.be.instanceOf(Function);
    })

    it ('should be return a function when apply', () => {
        expect(large()).to.be.instanceOf(Function);
    })

    it ('should be return true when large', () => {
        const l = large(0);
        expect(l('1')).to.be.equals(true);
        expect(l(1)).to.be.equals(true);
        expect(l(10)).to.be.equals(true);
        expect(l('100')).to.be.equals(true);
    })

    it ('should be return false when not large', () => {
        const l = large(-1);
        expect(l(-1)).to.be.equals(false);
        expect(l('-1')).to.be.equals(false);
        expect(l('-2')).to.be.equals(false);
        expect(l(-2)).to.be.equals(false);
        expect(l('')).to.be.equals(false);
        expect(l(null)).to.be.equals(false);
        expect(l(undefined)).to.be.equals(false);
    })
})
