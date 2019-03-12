// only for browser

function imageSizeP(imageFile) {
    return new Promise((done, reject) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            const img = new Image();
            img.src = reader.result;
            img.onload = () => {
                done({
                    width: img.width,
                    height: img.height
                });
            };
            img.onerror = reject;
        });
        reader.readAsDataURL(imageFile);
    })
}


export default imageSizeP;
