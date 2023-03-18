export const bookingBook = (booking) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (booking && booking?.customerId === user.id) {
    return 'current';
  }

  if (booking && booking?.customerId !== user.id) {
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

// export const bookingDate = (booking) => booking.dateOrder;
