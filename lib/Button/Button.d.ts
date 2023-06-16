declare class Button {
    node: HTMLButtonElement;
    icon?: SVGElement;
    constructor();
    setIcon(icon: SVGElement): this;
    setText(text: string): this;
    setDisabled(isDisabled: boolean): this;
    setActive(isActive: boolean): this;
    isActive(): boolean;
    onClick(callback: (event: MouseEvent) => void): this;
    addClassName(className: string): this;
    removeClassName(className: string): this;
}
export default Button;
