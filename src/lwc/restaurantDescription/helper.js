import {DomService} from "c/domService";

export class helper {
    static parent;

    static changeVisibility(isVisible) {
        const visibilityDiv = DomService.getElementByDataId('visibility', this.parent);

        if (isVisible) visibilityDiv.className = 'show';
        else visibilityDiv.className = 'hide';
    }
}