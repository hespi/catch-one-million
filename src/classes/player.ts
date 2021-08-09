import { v4 as uuidv4 } from 'uuid';

export default class Player {
    id: string;
    name: string;
    email: string;
    team: string;

    constructor(
        name: string = "", 
        email: string = "",
        team: string = "") {
            this.id = uuidv4();
            this.email = email;
            this.name = name;
            this.team = team;
    }
}