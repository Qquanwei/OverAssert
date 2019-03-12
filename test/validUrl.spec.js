import { expect } from 'chai';
import { validUrl } from '../src';

describe('validUrl Spec', () => {
    it ('should be a function', () => {
        expect(validUrl).to.be.instanceOf(Function);
    })

    it ('should be return a function when apply', () => {
        expect(validUrl()).to.be.instanceOf(Function);
    })

    it ('should be return true when url is valid', () => {
        const url = validUrl();

        expect(url('http://google.com')).to.be.equals(true);
        expect(url('http://localhost')).to.be.equals(true);
        expect(url('http://localhost/a/b/c')).to.be.equals(true);
        expect(url('http://localhost/a/b/c/index.html')).to.be.equals(true);
        expect(url('http://localhost/a/b/c/index.html?worldismine')).to.be.equals(true);
        expect(url('http://localhost/a/b/c?a=1&b=2')).to.be.equals(true);
        expect(url('http://127.0.0.1')).to.be.equals(true);
    })

    it ('should be return false when url is inalid', () => {
        const url = validUrl();
        expect(url('abc')).to.be.equals(false);
        expect(url(123)).to.be.equals(false);
        expect(url(undefined)).to.be.equals(false);
        expect(url(null)).to.be.equals(false);
        expect(url('helloworld.com')).to.be.equals(false);
        expect(url('worldismine/ccc')).to.be.equals(false);
        expect(url('127.0.0.1')).to.be.equals(false);
    })
})
