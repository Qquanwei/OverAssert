import { expect } from 'chai';
import { numeric } from '../src';

describe('numberic Spec', () => {

    it('should be a function', () => {
        expect(numeric).to.be.instanceOf(Function);
    })

    it('should return function when apply', () => {
        expect(numeric()).to.be.instanceOf(Function);
    })

    it ('should return true when value is numeric', () => {
        const num = numeric();

        expect(num(1)).to.be.equals(true);
        expect(num(-1)).to.be.equals(true);
        expect(num(0)).to.be.equals(true);
        expect(num('1')).to.be.equals(true);
        expect(num('-1')).to.be.equals(true);
        expect(num('0')).to.be.equals(true);

    })

    it ('should return false when value is\'t numeric', () => {
        const num = numeric();
        expect(num(NaN)).to.be.equals(false);
        expect(num(null)).to.be.equals(false);
        expect(num(undefined)).to.be.equals(false);
        expect(num('-')).to.be.equals(false);
        expect(num('false')).to.be.equals(false);
    })
})
