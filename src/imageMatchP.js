import _imageInfoP from './internal/_imageInfoP';
import compact from './compact';

// itShould(imageSizeMatch(
//  itShouldProp('width', large(100), always('weight should large 100'))
// ))
function imageMatchP(...assertFunction) {
    return file => {
        return _imageInfoP(file)
            .then(compact.apply(this, assertFunction));
    }
}

export default imageMatchP;
