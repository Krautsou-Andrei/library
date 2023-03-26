export const bookingError = (data) => {
  const today = new Date();
  const dateBooking = new Date(data);
  console.log('today', today);
  console.log('dateBooking', dateBooking);

  if (dateBooking.getDate() < today.getDate() || dateBooking.getMonth() < today.getMonth()) {
    return true;
  }
  return false;
};
