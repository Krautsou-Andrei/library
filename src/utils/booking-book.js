import { useSelector } from 'react-redux';

export const useBookingBook = (booking) => {
  const user = useSelector((state) => state.user.user);
  // const user = JSON.parse(localStorage.getItem('user'));

  if (booking && booking?.customerId === user?.user?.id) {
    return 'current';
  }

  if (booking && booking?.customerId !== user?.id) {
    return true;
  }

  return false;
};

export const bookingIsPage = (location) => {
  const array = location.pathname.match(/\d/g);

  if (array && array?.length > 0) {
    return true;
  }

  return false;
};
