class Topic {
    constructor(
        public name: string,
        public description: string
    ) {}

    equals(topic: Topic) {
        return (
            this.name === topic.name
        &&  this.description === topic.description );
    }
}
export { Topic };
