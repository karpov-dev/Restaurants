import {DomService} from "c/domService";

class CssVisibilityService {
    parent;
    showClass;
    hideClass;

    constructor(parent, showClass, hideClass) {
        if (!(parent && showClass && hideClass)) {
            console.error('Error. Parent: ' + parent + ' showClass: ' + showClass + ' hideClass: ' + hideClass);
        }

        this.parent = parent;
        this.showClass = showClass;
        this.hideClass = hideClass;
    }

    show(dataId) {
        if (!dataId) {
            console.error('DataId in null');
            return false;
        }

        DomService.removeClassFromElementByDataId(dataId, 'slds-hide', this.parent);
        DomService.removeClassFromElementByDataId(dataId, 'hide', this.parent);
        DomService.removeClassFromElementByDataId(dataId, this.hideClass, this.parent);
        DomService.addClassToElementByDataId(dataId, this.showClass, this.parent);
    }

    hide(dataId) {
        if (!dataId) {
            console.error('DataId in null');
            return false;
        }

        DomService.removeClassFromElementByDataId(dataId, this.showClass, this.parent);
        DomService.addClassToElementByDataId(dataId, this.hideClass, this.parent);
    }
}

export {CssVisibilityService}