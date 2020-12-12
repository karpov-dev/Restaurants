import {api, LightningElement} from 'lwc';
import changeStageOrderApex from "@salesforce/apex/SC_OpportunityService.changeStageOrder";
import {EventService} from "c/eventService";
import {ErrorService} from "c/errorService";

export default class ActiveOrderCard extends LightningElement {
    @api order;
    get orderItem() {return this.order}
    set orderItem(value) {this.order = value}

    deleteOrder(event) {
        EventService.spinnerEvt(true, this);
        changeStageOrderApex({orderId: this.order.Id, stage: this.order.StageName})
            .then(result => {
                EventService.showToastEvt('Success', 'Order status changed successfully!', 'success', this);
                EventService.orderWasDeleted(this.order.Id, this);
            })
            .catch(error => ErrorService.logError(error))
            .finally(() => {EventService.spinnerEvt(false, this)});
    }
}