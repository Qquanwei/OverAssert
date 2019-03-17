import { expect } from 'chai';
import { required } from '../src';

describe('required Spec', () => {

    it ('should be a function', () => {
        expect(required).to.be.instanceOf(Function);
    })

    it ('should be return a function when apply', () => {
        expect(required()).to.be.instanceOf(Function);
    })

    it ('should be return true when value is truthy ', () => {
        const req = required();

        expect(req('1')).to.be.equals(true);
        expect(req({})).to.be.equals(true);
        expect(req(123)).to.be.equals(true);
        expect(req(0)).to.be.equals(true);
        expect(req('0')).to.be.equals(true);
        expect(req(false)).to.be.equals(true);
    })

    it ('should be return false when value is falsy', () => {
        const req = required();

        expect(req()).to.be.equals(false);
        expect(req(null)).to.be.equals(false);
        expect(req(undefined)).to.be.equals(false);
        expect(req('')).to.be.equals(false);
    })
})
