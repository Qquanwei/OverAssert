import { expect } from 'chai';
import { validIP } from '../src';

describe('validIP Spec ', () => {

    it ('should be a function', () => {
        expect(validIP).to.be.instanceOf(Function);
    })

    it ('should return a function when apply', () => {
        expect(validIP()).to.be.instanceOf(Function);
    })

    it ('should return true when ip valid ', () => {
        const ip = validIP();
        expect(ip('192.168.0.1')).to.be.equals(true);
        expect(ip('255.255.255.255')).to.be.equals(true);
        expect(ip('0.0.0.0')).to.be.equals(true);
    })

    it ('should return false when ip invalid', () => {
        const ip = validIP();
        expect(ip('1.1.1.1.1')).to.be.equals(false);
        expect(ip(null)).to.be.equals(false);
        expect(ip(undefined)).to.be.equals(false);
        expect(ip('')).to.be.equals(false);
        expect(ip(12345)).to.be.equals(false);
        expect(ip('256.0.0.1')).to.be.equals(false);
    })
})
