import { User } from './user';

export class Post {

    private id: number;
    private text: string='';
    private timestamp: string='';
    private image: string='';
    private user: User;

    constructor(text: string, user: User, image?: string){
        this.text=text;
        this.image=image;
        this.user=user;
    }
    public getId(): number {
        return this.id;
    }
    public setId(id:number): void {
        this.id=id;
    }

    public getText(): string {
        return this.text;
    }
    public getTimestamp(): string {
        return this.timestamp;
    }
    public setTimestamp(timestamp:string): void {
       this.timestamp=timestamp;
    }
    public getImage(): string {
        return this.image;
    }
    public getUser(): User {
        return this.user;
    }
}