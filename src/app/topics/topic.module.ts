class Topic {
    constructor(
        public url: string,
        public port: number,
        public name: string,
        public username: string,
        public password: string,
        public userUID: string
    ) {}

    equals(topic: Topic) {
        return (
            this.url === topic.url &&
            this.port === topic.port &&
            this.name === topic.name &&
            this.username === topic.username &&
            this.password === topic.password );
    }
}
export { Topic };
