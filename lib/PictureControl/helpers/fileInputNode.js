export default function fileInputNode() {
    const node = document.createElement('input');
    node.type = 'file';
    node.accept = '.jpg, .jpeg, .png';
    node.multiple = true;
    return node;
}
//# sourceMappingURL=fileInputNode.js.map