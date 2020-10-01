import { Injectable } from '@angular/core';
import { IUser,Role } from '../_models/user.interface';

const users: IUser[] = [
  { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
  { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User }
];

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor() { }
  login(username,password){
    const user = users.find(x => x.username === username && x.password === password);
    if (!user) return 'user not exist'
    return {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        token: `fake-jwt-token.${user.id}`
    };
  }
}
