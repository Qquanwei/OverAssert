import { expect } from 'chai';
import { decimal } from '../src';

describe('decimal Spec', () => {

    it ('should be a function', () => {
        expect(decimal).to.be.instanceOf(Function);
    })

    it ('should return a function when apply', () => {
        expect(decimal()).to.be.instanceOf(Function);
    })

    it ('should return true when value is decimal', () => {
        const dec = decimal();
        expect(dec('0.1')).to.be.equals(true);
        expect(dec(0.1)).to.be.equals(true);
        expect(dec('123.1212')).to.be.equals(true);
        expect(dec(123.2173823812)).to.be.equals(true);
        expect(dec(123)).to.be.equals(true);
        expect(dec('123')).to.be.equals(true);
        expect(dec('.123')).to.be.equals(true);
    })

    it ('should return false when value is not decimal', () => {
        const dec = decimal();

        expect(dec(null)).to.be.equals(false);
        expect(dec(undefined)).to.be.equals(false);
        expect(dec('123.a')).to.be.equals(false);
        expect(dec('abc.123')).to.be.equals(false);
        expect(dec('abc')).to.be.equals(false);
    })
})
