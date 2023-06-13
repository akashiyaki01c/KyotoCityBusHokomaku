class Hokomaku {
    #root = null;
    #id = "";

    constructor(id) {
        this.#id = id;
        var root = document.getElementById(id);
        root.classList.add("hokomaku");
        root.innerHTML = `
            <div ${this.#getClassAndId("hokomaku-inner")}>
                <div ${this.#getClassAndId("street-color-outer")}></div>
                <div ${this.#getClassAndId("dest-outer")}>${this.#initializeDest()}</div>
                <div ${this.#getClassAndId("route-outer")}>${this.#initializeRoute()}</div>
            </div>
        `;
        this.#root = root;
    }

    #getClassAndId(name) {
        return `id="${this.#id}-${name}" class="${name}"`;
    }
    #getId(name) {
        return `${this.#id}-${name}`;
    }
    #getElementByName(name) {
        return document.getElementById(this.#getId(name));
    }

    #initializeDest() {
        return `
            <div ${this.#getClassAndId("street-name")}></div>
            <div ${this.#getClassAndId("dest-main")}></div>
            <div ${this.#getClassAndId("street-color-line")}></div>
            <div ${this.#getClassAndId("dest-english")}></div>
        `;
    }
    #initializeRoute() {
        return `
            <div ${this.#getClassAndId("route-upper")}></div>
            <div ${this.#getClassAndId("route-lower")}></div>
        `;
    }
    drawRoute(mainNumber, subNumber, color, isReverse) {
        if (subNumber == "") {
            this.#getElementByName("route-upper").classList.add("hokomaku-hide");
            this.#getElementByName("route-lower").innerHTML = mainNumber;
        } else {
            this.#getElementByName("route-upper").classList.remove("hokomaku-hide");
            this.#getElementByName("route-upper").innerHTML = subNumber;
            this.#getElementByName("route-lower").innerHTML = mainNumber;
        }
        this.#getElementByName("route-outer").classList.remove(`route-color-normal`, `route-color-loop`, `route-color-seiriken`);
        this.#getElementByName("route-outer").classList.add(`route-color-${color}`);
        if (isReverse) {
            this.#getElementByName("route-outer").classList.add("hokomaku-reverse");
        } else {
            this.#getElementByName("route-outer").classList.remove("hokomaku-reverse");
        }
    }
    drawStreet(name) {
        var streetDictionary = {
            "西大路通": "nishioji",
            "千本通": "sembon",
            "大宮通": "omiya",
            "堀川通": "horikawa",
            "河原町通": "kawaramachi",
            "東山通": "higashiyama",
            "白川通": "shirakawa",
            "_": "none",
        }
        for (const key in streetDictionary) {
            const element = streetDictionary[key];
            this.#getElementByName("street-color-outer").classList.remove("street-color-" + element);
            this.#getElementByName("street-color-line").classList.remove("street-color-" + element);
        }
        if (streetDictionary[name] != undefined) {
            this.#getElementByName("street-color-outer").classList.add("street-color-" + streetDictionary[name]);
            this.#getElementByName("street-color-line").classList.add("street-color-" + streetDictionary[name]);
            this.#getElementByName("street-color-outer").classList.remove("hokomaku-hide");
        } else {
            this.#getElementByName("street-color-line").classList.add("street-color-none");
            this.#getElementByName("street-color-outer").classList.add("hokomaku-hide");
        }
        
    }
    drawDest(streetName, mainDest, english) {
        if (streetName == "") {
            this.#getElementByName("street-name").classList.add("hokomaku-hide");
        } else {
            this.#getElementByName("street-name").classList.remove("hokomaku-hide");
        }
        this.#getElementByName("street-name").innerHTML = streetName;
        this.#getElementByName("dest-main").innerHTML = mainDest;
        this.#getElementByName("dest-english").innerHTML = english;
    }
    drawWithInfo(info) {
        this.drawStreet(info.street);
        this.drawRoute(info.routeNumber, info.subRouteNumber, info.routeColor, info.isReverse);
        this.drawDest(info.street, getDestHtml(info.subDest, info.mainDest), info.englishDest);
        this.drawDoubleLine(info.isDoubleLine)
    }
    drawDoubleLine(isVisible) {
        if (isVisible) {
            this.#getElementByName("street-color-line").classList.add("express-line");
        } else {
            this.#getElementByName("street-color-line").classList.remove("express-line");
        }
    }
}