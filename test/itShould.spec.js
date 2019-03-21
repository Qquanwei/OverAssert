import { expect } from 'chai';
import { of, itShould, always } from '../src';

describe('itShould Spec', () => {
    it ('should itShould can take a Promise predicate', (done) => {
        of(3).map(itShould(() => Promise.resolve(true), always('A')))
            .validate((success) => {
                expect(success).to.be.equals(true);
            });

        of(3).map(itShould(() => Promise.reject(true), always('A')))
            .validate((success, reason) => {
                expect(success).to.be.equals(false);
                expect(reason).to.be.equals('A');
                done();
            })

    })

    it ('should itShould can take a Promise<Assert> predicate', (done) => {
        of(3).map(itShould(() => Promise.resolve(of(1)), always('A')))
            .validate((success) => {
                expect(success).to.be.equals(true);
            });

        of(3).map(itShould(() => Promise.resolve(of(1).map(() => 'B')), always('A')))
            .validate((success, reason) => {
                expect(success).to.be.equals(false);
                expect(reason).to.be.equals('B');
                done();
            })

    })
})
