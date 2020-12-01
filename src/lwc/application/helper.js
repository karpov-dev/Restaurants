import {DomService} from "c/domService";

export class helper {
    static parent;

    static showToast(title, message, variant) {
        const toast = DomService.getElementByTag('c-toast', this.parent);

        toast.setData(title, message, variant);
        toast.show();
    }

    static showSpinner(spinnerState) {
        const spinner = DomService.getElementByTag('c-spinner', this.parent);

        spinner.showSpinner(spinnerState);
    }

    static changePage(pageName) {
        const pageManager = DomService.getElementByTag('c-page-manager', this.parent);

        pageManager.changePage(pageName, pageManager);
    }
}