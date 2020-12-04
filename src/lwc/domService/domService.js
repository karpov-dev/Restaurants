export {DomService}

class DomService {
    static VISIBILITY = {
        VISIBLE: true,
        NOT_VISIBLE: false
    }

    static getElementByDataId(elementName, owner) {
        return owner.template.querySelector("[data-id = " + elementName + ' ]');
    }

    static getAllElementsByTag(tagName, owner) {
        return owner.template.querySelectorAll(tagName);
    }

    static getElementByTag(tagName, owner) {
        return owner.template.querySelector(tagName);
    }

    static addClassToElementByDataId(dataId, classToAdd, owner) {
        const element = this.getElementByDataId(dataId, owner);
        element.classList.add(classToAdd);
    }

    static removeClassFromElementByDataId(dataId, classToRemove, owner) {
        const element = this.getElementByDataId(dataId, owner);
        element.classList.remove(classToRemove);
    }

    static setVisibility(isVisible, elementDataId, owner) {
        const element = this.getElementByDataId(elementDataId, owner);
        if (!element) return false;

        element.classList.remove('hide');
        element.classList.remove('show');

        if (isVisible) {
            element.classList.add('show')
        }
        else {
            element.classList.add('hide');
        }
    }

    static setVisibilityByElement(isVisible, element) {
        if (isVisible) {
            element.classList.remove('hide');
            element.classList.add('show');
        } else {
            element.classList.remove('show');
            element.classList.add('hide');
        }
    }
}