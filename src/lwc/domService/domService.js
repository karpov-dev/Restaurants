export {DomService}

class DomService {
    static VISIBILITY = {
        VISIBLE: true,
        NOT_VISIBLE: false
    }

    static getElementByDataId(elementName, owner) {
        return owner.template.querySelector("[data-id = " + elementName + ' ]');
    }

    static getAllElementsByDataId(elementName, owner) {
        return owner.template.querySelectorAll("[data-id = " + elementName + ' ]');
    }

    static getAllElementsByTag(tagName, owner) {
        return owner.template.querySelectorAll(tagName);
    }

    static getElementByTag(tagName, owner) {
        return owner.template.querySelector(tagName);
    }

    static addClassToElementByDataId(dataId, classToAdd, owner) {
        const elements = this.getAllElementsByDataId(dataId, owner);
        if (!elements) return null;

        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.add(classToAdd);
        }
    }

    static removeClassFromElementByDataId(dataId, classToRemove, owner) {
        const elements = this.getAllElementsByDataId(dataId, owner);
        if (!elements) return null;

        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove(classToRemove);
        }
    }

}