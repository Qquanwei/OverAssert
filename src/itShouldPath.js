import _path from './internal/_path';
import itShould from './itShould';

function itShouldPath(path, predicate, failed) {
    return value => {
        const ans = _path(path, value);
        if (ans === undefined) {
            return failed(undefined);
        }

        return itShould(predicate, failed)(ans);
    }
}

export default itShouldPath;
