class Center {
    static getCenter(str, widthEm, heightEm, fontSize, charCount) {
        return `
            <span class="center-outer" style="width: ${widthEm}em; height: ${heightEm}em; font-size: ${fontSize};">
                <span class="center-inner" style="transform: translate(-50%, -50%) scaleX(${this.#getScaleX(str, widthEm, charCount || 0)});">${str}</span>
            </span>`.replaceAll("\n", "");
    }

    static #getScaleX(str, widthEm, charCount) {
        if (charCount === 0)
            charCount = str.length - (str.match( /[･1-9A-Za-z↔︎]/g ) || []).length / 2; // 半角`・`を0.5文字扱いにする
        if (widthEm > charCount) {
            return 1;
        } else {
            return widthEm / charCount;
        }
    }
}