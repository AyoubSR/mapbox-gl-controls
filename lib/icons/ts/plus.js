const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <rect fill="none" height="24" width="24"/>
    <path d="M18,13h-5v5c0,0.55-0.45,1-1,1l0,0c-0.55,0-1-0.45-1-1v-5H6c-0.55,0-1-0.45-1-1l0,0c0-0.55,0.45-1,1-1h5V6 c0-0.55,0.45-1,1-1l0,0c0.55,0,1,0.45,1,1v5h5c0.55,0,1,0.45,1,1l0,0C19,12.55,18.55,13,18,13z"/>
</svg>`;
export default () => (new DOMParser().parseFromString(svg, 'image/svg+xml')).firstChild;
//# sourceMappingURL=plus.js.map