import { User } from './user';

export class Story {
    id: number;
    text: string;
    timestamp: string;
    image: string;
    user: User;

    getId(): number {
        return this.id;
    }
    getText(): string {
        return this.text;
    }
    getTimestamp(): string {
        return this.timestamp;
    }
    getImage(): string {
        return this.image;
    }
    getUser(): User {
        return this.user;
    }
}