import { expect } from 'chai';
import { alpha } from '../src';

describe('alpha spec', () => {

    it ('should be a function', () => {
        expect(alpha).to.be.instanceOf(Function);
    })

    it ('should return a function when apply', () => {
        expect(alpha()).to.be.instanceOf(Function);
    })

    it ('should be return true when value is alpha', () => {
        const alp = alpha();

        expect(alp('a')).to.be.equals(true);
        expect(alp('abc')).to.be.equals(true);
        expect(alp('AuiZ')).to.be.equals(true);
        expect(alp('Z')).to.be.equals(true);
        expect(alp('AA')).to.be.equals(true);
    })

    it ('should be return false when value isn\'t alpha', () => {
        const alp = alpha();

        expect(alp('1')).to.be.equals(false);
        expect(alp(1)).to.be.equals(false);
        expect(alp('a1')).to.be.equals(false);
        expect(alp(null)).to.be.equals(false)
        expect(alp(undefined)).to.be.equals(false)
        expect(alp('A12c')).to.be.equals(false)
        expect(alp('a!@#')).to.be.equals(false)
    })
})
