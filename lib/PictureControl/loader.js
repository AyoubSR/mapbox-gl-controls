import Picture from './Picture';
import { defaultPosition } from './helpers/defaultPosition';
export function fromFile(map, file) {
    return new Promise(((resolve, reject) => {
        const reader = new FileReader();
        const node = new Image();
        reader.addEventListener('load', () => {
            const imageUrl = reader.result;
            node.onload = () => {
                const picture = new Picture({
                    id: file.name,
                    url: imageUrl,
                    width: node.width,
                    height: node.height,
                    position: defaultPosition(map, node.width, node.height),
                });
                resolve(picture);
            };
            node.onerror = reject;
            node.src = imageUrl;
        }, false);
        reader.readAsDataURL(file);
    }));
}
export function fromUrl(map, url) {
    return new Promise(((resolve, reject) => {
        const node = new Image();
        node.onload = () => {
            const picture = new Picture({
                id: url.split('/').pop(),
                url,
                width: node.width,
                height: node.height,
                position: defaultPosition(map, node.width, node.height),
            });
            resolve(picture);
        };
        node.onerror = reject;
        node.src = url;
    }));
}
//# sourceMappingURL=loader.js.map