import _isThenable from './internal/_isThenable';
import always from './always';
import Failed from './failed';

function itShould(predicate, failed) {
    return value => {
        const returnValue = predicate(value);

        if (_isThenable(returnValue)) {
            // there is 2 situation will consider be failed.
            return returnValue
                .then(result => {
                    // situation 1
                    if (result instanceof Failed) {
                        return result;
                    }
                    return value
                })
                .catch(e => {
                    // situation 2
                    return new Failed(failed(e));
                });
        }

        if (!returnValue) {
            return new Failed(failed(value));
        }

        return false;
    }
}

export default itShould;
