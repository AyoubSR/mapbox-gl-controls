const svg = `<svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fill-rule="evenodd">
        <path d="M0 0h24v24H0z"/>
        <path fill="#f44336" d="M12 3l4 8H8z"/>
        <path fill="#9E9E9E" d="M12 21l-4-8h8z"/>
    </g>
</svg>`;
export default () => (new DOMParser().parseFromString(svg, 'image/svg+xml')).firstChild;
//# sourceMappingURL=pointer.js.map