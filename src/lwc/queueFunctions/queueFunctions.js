class QueueFunctions {
    queue = [];

    pushElement(queueFunction) {
        if (!queueFunction) {
            console.error('Can not push empty function to Queue');
            return false;
        }

        return this.queue.push(queueFunction);
    }

    popElement() {
        if (this.queue) this.queue.pop()();
    }

    shiftElement() {
        if(this.queue && this.queue.length > 0) this.queue.shift()();
    }

    clear() {
        this.queue = [];
    }
}

export {QueueFunctions}