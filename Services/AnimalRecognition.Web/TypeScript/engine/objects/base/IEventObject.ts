interface IEventObject {
    readonly events: Map<string, () => void>;

    addEvent(eventKey: string, callback: () => void): void

    removeEvent(eventKey: string): void;

    executeEvent(eventKey: string): void;
}

export default IEventObject;