import { User } from './user';

export class Comment {

    id: number;
    text: string = '';
    timestamp: string = '';
    user: User;
    post: number;

    constructor(text: string, timestamp: string, user: User, post: number) {
        this.text = text;
        this.timestamp = timestamp;
        this.user = user;
        this.post = post;
    }

}