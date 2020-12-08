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
        this.queue.pop()();
    }

    shiftElement() {
        this.queue.shift()();
    }

    clear() {
        this.queue = [];
    }
}

export {QueueFunctions}