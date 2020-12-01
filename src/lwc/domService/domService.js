export {DomService}

class DomService {
    static getElementByDataId(elementName, owner) {
        return owner.template.querySelector("[data-id = " + elementName + ' ]');
    }

    static getAllElementsByTag(tagName, owner) {
        return owner.template.querySelectorAll(tagName);
    }

    static getElementByTag(tagName, owner) {
        return owner.template.querySelector(tagName);
    }

    static changeElementClass(elementName, className, owner) {
        const domElement = this.getElementByDataId(elementName, owner);
        domElement.className = className;
    }
}