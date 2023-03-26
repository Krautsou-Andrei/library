export const profileLocation = (location) => {
  const array = location.pathname;

  if (array.includes('profile')) {
    return true;
  }
  return false;
};
