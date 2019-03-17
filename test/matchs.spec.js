import { expect } from 'chai';
import { matchs } from '../src';


describe('matchs Spec', () => {
    it ('should be a function', () => {
        expect(matchs).to.be.instanceOf(Function);
    })

    it ('should be return a function when apply', () => {
        expect(matchs('')).to.be.instanceOf(Function);
    })

    it ('should return true when match reg', () => {
        const match = matchs(/abc/);

        expect(match('abcd')).to.be.equals(true);
        expect(match('%^&*abjlabc&*s')).to.be.equals(true);
    })

    it ('should return true when match string', () => {
        const match = matchs(/123/);

        expect(match(12345)).to.be.equals(true);
        expect(match('561234')).to.be.equals(true);
    })

    it ('should be return false when not match', () => {
        const match = matchs(/123/);

        expect(match(undefined)).to.be.equals(false);
        expect(match(null)).to.be.equals(false);
        expect(match('')).to.be.equals(false);
        expect(match(5678)).to.be.equals(false);
        expect(match('abcd')).to.be.equals(false);
    })
})
