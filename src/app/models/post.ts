import { User } from './user';

export class Post {

    id: number;
    text: string='';
    timestamp: string='';
    image: string='';
    user: User;

    constructor(text: string, user: User, image?: string){
        this.text=text;
        this.image=image;
        this.user=user;
    }
  
}