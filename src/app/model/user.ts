export class User {
    id: number;
    username: string;
    password: string;
    fullname: string;
    male: boolean;
    image: string;
    visible: boolean;


    getId(): number {
        return this.id;
    }
    getUsername(): string {
        return this.username;
    }
    getFullname(): string {
        return this.fullname;
    }
    isMale(): boolean {
        return this.male;
    }
    getImage(): string {
        return this.image;
    }
    isVisible(): boolean {
        return this.visible;
    }

}