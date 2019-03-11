import { expect } from 'chai';
import always from '../src/always';
import of from '../src/of';
import itShould from '../src/itShould';

describe('normalP Spec', () => {
    it ('should create a async assert', (resolve) => {
        function delay(ms) {
            return () => {
                return new Promise((d) => {
                    setTimeout(d, ms);
                });
            };
        }

        of(1)
            .map(itShould(delay(30), always('not')))
            .validate((success, value) => {
                expect(success).to.be.equals(true);
                expect(value).to.be.equals(1);
                resolve();
            });
    })

    it ('should catch async error', (resolve) => {
        function delayAndThrow(ms) {
            return () => {
                return new Promise((_1, reject) => {
                    setTimeout(reject, ms);
                });
            };
        }

        of(1)
            .map(itShould(delayAndThrow(30), always('yes')))
            .validate((success, value) => {
                expect(success).to.be.equals(false);
                expect(value).to.be.equals('yes');
                resolve();
            });
    })
})
