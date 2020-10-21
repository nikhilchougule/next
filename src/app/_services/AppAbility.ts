import { AbilityBuilder, Ability, detectSubjectType, AbilityClass, InferSubjects } from '@casl/ability';

type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete';
// type Subjects = InferSubjects<Todo> | 'all';
type Subjects = 'cda' | 'cs' | 'scips'| 'all'

export type AppAbility = Ability<[Actions, Subjects]>;
export const AppAbility = Ability as AbilityClass<AppAbility>;

export function defineAbilitiesFor(role: string) {
  const { can, rules,cannot } = new AbilityBuilder<AppAbility>();
    console.log(role)
  if (role === 'Admin') {
    can('manage', 'all');
    can('create','cs')
    can('create','cda')
    can('create','scips')

  } else if(role === 'User') {
    can('read', 'all');
    can('manage', 'all');
    // cannot('create','cs')
  }

  return rules;
}

/**
 * Read for details: https://stalniy.github.io/casl/v4/en/guide/subject-type-detection
 */
function detectAppSubjectType(subject?: Subjects) {
  if (subject && typeof subject === 'object') {
    return subject;
  }

  return detectSubjectType(subject);
}

export function createAbility() {
  return new AppAbility(defineAbilitiesFor('member'), {
    detectSubjectType: detectAppSubjectType,
  });
}
