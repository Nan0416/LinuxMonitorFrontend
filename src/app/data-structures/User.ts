export class User{
    username: string;
    email: string;
    status: number;
    profile: string;
}
export class SessionUser{
    sessionid: string;
    user: User;
}
