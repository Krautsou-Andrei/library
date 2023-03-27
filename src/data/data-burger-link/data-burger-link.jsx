import { routs } from '../routs';

export const DataBurgerLink = () => {
  const array = [
    { id: 'burger-1', link: `${routs.profile}`, title: 'Профиль', dataTest: 'true', dataTestLink: 'profile-button' },
    { id: 'burger-2', link: `${routs.auth}`, title: 'Выход', dataTest: 'true', dataTestLink: 'exit-button' },
  ];
  return array;
};
