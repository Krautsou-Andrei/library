export const DataBurgerLink = () => {
  const array = [
    { id: 'burger-1', link: '/profile', title: 'Профиль' },
    { id: 'burger-2', link: '/auth', title: 'Выход', dataTest: 'true', dataTestLink: 'exit-button' },
  ];
  return array;
};
