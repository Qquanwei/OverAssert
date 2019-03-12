import { expect } from 'chai';
import { natureNoZero } from '../src';

describe('natureNoZero Spec', () => {
    it ('should be a function', () => {
        expect(natureNoZero).to.be.instanceOf(Function);
    })

    it ('should return a function when apply', () => {
        expect(natureNoZero()).to.be.instanceOf(Function);
    })

    it ('should return true when nature no zero', () => {
        const nat = natureNoZero();
        expect(nat(1)).to.be.equals(true);
        expect(nat(2)).to.be.equals(true);
        expect(nat('123')).to.be.equals(true);
    })


    it ('should return false when not naturenozero ', () => {
        const nat = natureNoZero();
        expect(nat(0)).to.be.equals(false);
        expect(nat(-1)).to.be.equals(false);
        expect(nat(1.2)).to.be.equals(false);
        expect(nat(-1.2)).to.be.equals(false);
        expect(nat('-1')).to.be.equals(false);
        expect(nat('abc')).to.be.equals(false);
        expect(nat('1.1')).to.be.equals(false);
    })
})
