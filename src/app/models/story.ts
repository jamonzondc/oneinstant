import { User } from './user';

export class Story {
  
    constructor(public id: number, public text: string, public timestamp: string, public image: string, public user: User) {
           
    }


}