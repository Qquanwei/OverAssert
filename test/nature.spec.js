import { expect } from 'chai';
import { nature } from '../src';

describe('nature Spec', () => {
    it ('should be a function', () => {
        expect(nature).to.be.instanceOf(Function);
    })

    it ('should return a function when apply', () => {
        expect(nature()).to.be.instanceOf(Function);
    })

    it ('should return true when value is nature', () => {
        const nat = nature();
        expect(nat(1)).to.be.equals(true);
        expect(nat(100)).to.be.equals(true)
        expect(nat('100')).to.be.equals(true)
        expect(nat('18782178')).to.be.equals(true)
    })

    it ('should return false when value is not nature', () => {
        const nat = nature();
        expect(nat(0)).to.be.equals(false);
        expect(nat('0')).to.be.equals(false);
        expect(nat(1.2)).to.be.equals(false);
        expect(nat(null)).to.be.equals(false);
        expect(nat(undefined)).to.be.equals(false);
        expect(nat('1.2')).to.be.equals(false);
        expect(nat('abc')).to.be.equals(false);
        expect(nat({})).to.be.equals(false);
    })
})
