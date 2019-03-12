import _imageSizeP from './internal/_imageSizeP';
import compact from './compact';

// itShould(imageSizeMatch(
//  itShouldProp('width', large(100), always('weight should large 100'))
// ))
function imageMatchP(...assertFunction) {
    return file => {
        return _imageSizeP(file)
            .then(compact.apply(this, assertFunction));
    }
}

export default imageMatchP;
