import { UserData } from "./user-data.model";
import { RolData } from "./rol-data.model";

export class SessionData{
    token?: string;
    usuario?: UserData;
    rol?: RolData;
    isLoggedIn: boolean = false;
}