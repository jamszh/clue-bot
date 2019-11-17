class ActivationWarning extends Error {
    /**
     * When '$cb' is not present in the post
     * Required to be an error to change the flow of the promise chain
     * Should only be logged as a info too
     */
    constructor(message) {
        super(message);
        this.name = "ActivationWarning";
    }
}

module.exports = ActivationWarning;