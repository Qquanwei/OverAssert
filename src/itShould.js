import _isThenable from './internal/_isThenable';
import always from './always';
import Failed from './failed';

function itShould(predicate, failed) {
    return value => {
        const returnValue = predicate(value);

        if (_isThenable(returnValue)) {
            return returnValue
                .then(always(value))
                .catch(e => {
                    return new Failed(failed(e));
                });
        }

        if (!returnValue) {
            return failed(value);
        }

        return false;
    }
}

export default itShould;
