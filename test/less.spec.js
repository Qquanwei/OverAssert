import { less } from '../src';
import { expect } from 'chai';

describe('less Spec', () => {

    it ('should be a function', () => {
        expect(less).to.be.instanceOf(Function);
    })

    it ('should be return a function when apply', () => {
        expect(less()).to.be.instanceOf(Function);
    })

    it ('should return true when less', () => {
        const l = less(10);
        expect(l(1)).to.be.equals(true);
        expect(l(-1)).to.be.equals(true);
        expect(l(9)).to.be.equals(true);
        expect(l('8')).to.be.equals(true);
        expect(l('-1')).to.be.equals(true);
    })

    it ('should return false when not less', () => {
        const l = less(-1);
        expect(l(1)).to.be.equals(false);
        expect(l(-1)).to.be.equals(false);
        expect(l('-1')).to.be.equals(false);
        expect(l(19)).to.be.equals(false);
        expect(l(null)).to.be.equals(false);
        expect(l(undefined)).to.be.equals(false);
    })
})
