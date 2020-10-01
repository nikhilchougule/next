export enum Role {
    User = 'User',
    Admin = 'Admin'
}
export interface IUser {
    id:Number,
    username:String,
    password:String,
    firstName:String,
    lastName:String,
    role:Role
}