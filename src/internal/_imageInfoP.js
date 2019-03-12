// only for browser

function imageInfoP(imageFile) {
    return new Promise((done, reject) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            const img = new Image();
            img.src = reader.result;
            img.onload = () => {
                done(img);
            };
            img.onerror = reject;
        });
        reader.readAsDataURL(imageFile);
    })
}


export default imageInfoP;
