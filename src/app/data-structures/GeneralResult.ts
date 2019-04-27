export class Result{
    value: any;
    reasons:string[];
    success: boolean;
}
export class SessionResult{
    sessionid: string;
    result: Result;
}