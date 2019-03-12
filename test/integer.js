import { expect } from 'chai';
import { integer, of, always } from '../src';

describe('integer spec', () => {
    it ('should integer is a function', () => {
        expect(integer).to.be.instanceOf(Function);
    })

    it ('should integer return a function when apply', () => {
        expect(integer()).to.be.instanceOf(Function);
    })

    it ('should return true when value is a integer', () => {
        const int = integer();
        expect(int(1)).to.be.equals(true);
        expect(int('1')).to.be.equals(true);
        expect(int(123)).to.be.equals(true);
        expect(int(-123)).to.be.equals(true);
        expect(int('-123')).to.be.equals(true);
    })

    it ('should return false when value invalid or not integer', () => {
        const int = integer();
        expect(int(1.2)).to.be.equals(false);
        expect(int(-1.2)).to.be.equals(false);
        expect(int(null)).to.be.equals(false);
        expect(int(undefined)).to.be.equals(false);
        expect(int('ab')).to.be.equals(false);
        expect(int('123.1')).to.be.equals(false);
    })
})
