function getSubDestHtml(input1, input2) {
    if (input2 === undefined) {
        return `<div>${input1}</div>`;
    }
    return `<div>${input1}</div><div>${input2}</div>`;
}

function getDestHtml(subDest, mainDest) {
    if (subDest != "") {
        return `
        <div style="display: flex; align-items: center; width: 100%; justify-content: space-between;">
            <div style="text-align: left; line-height: 1.1; height: fit-content; font-weight: 500; margin-left: 0.2em;">${getSubDestHtml(...subDest.split("\n"))}</div>
            <div style="height: fit-content; font-weight: 600; display: flex;">${mainDest}</div>
        </div>`;
    } else {
        return `
        <div style="display: flex; align-items: center; width: 100%; justify-content: center;">
            <div style="height: fit-content; font-weight: 600; display: flex;">${mainDest}</div>
        </div>`;
    }
}