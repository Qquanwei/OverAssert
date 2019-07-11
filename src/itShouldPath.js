import _path from './internal/_path';
import itShould from './itShould';

function itShouldPath(path, predicate, failed) {
    if (!predicate || typeof predicate !== 'function') {
        throw new Error(`itShouldPath ${path} require second parameter is function`);
    }
    if (!failed || typeof failed !== 'function') {
        throw new Error(`itShouldPath ${path} require third parameter is function`);
    }

    return value => {
        const ans = _path(path, value);
        if (ans === undefined) {
            return failed(undefined);
        }

        return itShould(predicate, failed)(ans);
    }
}

export default itShouldPath;
