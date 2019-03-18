import { expect } from 'chai';
import { alphaDash } from '../src';

describe('alphaDash Spec', () => {

    it ('should be a function', () => {
        expect(alphaDash).to.be.instanceOf(Function);
    })

    it ('should be return a function when apply', () => {
        expect(alphaDash()).to.be.instanceOf(Function);
    })

    it ('should return true when only contains alphaDash', () => {
        const adash = alphaDash();

        expect(adash('abc')).to.be.equals(true);
        expect(adash('abc_d')).to.be.equals(true);
        expect(adash('-')).to.be.equals(true);
        expect(adash('_-ca')).to.be.equals(true);
    })

    it ('should return false when value is not alphaDash', () => {
        const adash = alphaDash();

        expect(adash('789')).to.be.equals(false);
        expect(adash('abc789')).to.be.equals(false);
        expect(adash(123)).to.be.equals(false);
        expect(adash('_abc78')).to.be.equals(false);
        expect(adash(null)).to.be.equals(false);
        expect(adash(undefined)).to.be.equals(false);
    })
})
