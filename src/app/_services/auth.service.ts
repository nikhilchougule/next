import { Injectable } from '@angular/core';
import { IUser,Role } from '../_models/user.interface';
import {createAbility,defineAbilitiesFor, AppAbility} from '../_services/AppAbility';
import { Ability, AbilityBuilder } from '@casl/ability';

const users: IUser[] = [
  { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
  { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User }
];

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private ability: Ability) {}
  login(username,password){
    const user = users.find(x => x.username === username && x.password === password);
    if (!user) return 'user not exist';
    // createAbility(user.role);
    // defineAbilitiesFor(user.role)
  this.updateAbility(user) 
    
    return {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        token: `fake-jwt-token.${user.id}`
    };
  }
  private updateAbility(user) {
    // const { can, rules } = new AbilityBuilder();
    const { can, rules,cannot } = new AbilityBuilder<AppAbility>();

    if (user.role === 'Admin') {
      can('manage', 'all');
    } else {
      can('read', 'all');
    }
 
    this.ability.update(rules);
  }
 
//   private defineAbility(user) {
//     const { can, cannot, rules } = new AbilityBuilder(Ability);
// console.log(user)
//   if (user.role === 'Admin') {
//     can('create', 'cs');
//     can('delete','cs');
//     can('update', 'cs')
//   } else if(user.role === 'User') {
//     can('read', 'cs') // read-only access to everything
//   }

//   // cannot('delete', 'cda', { published: true });
//   // cannot('delete', 'cs', { published: true });

//   return new AppAbility(rules);
 
// }


}
