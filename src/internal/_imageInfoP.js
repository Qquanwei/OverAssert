import _validUrl from './_validUrl';
// only for browser

function getImage(src) {
    return new Promise((done, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            done(img);
        };
        img.onerror = reject;
    });
}

function imageInfoP(imageFile) {
    // src
    if (typeof imageFile === 'string') {
        return getImage(imageFile);
    }

    // blob
    return new Promise((done) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            done(getImage(reader.result));
        });
        reader.readAsDataURL(imageFile);
    })
}


export default imageInfoP;
