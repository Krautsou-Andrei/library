export const bookingError = (data) => {
  const today = new Date();
  const dateBooking = new Date(data);

  if (dateBooking.getDate() < today.getDate() || dateBooking.getMonth() < today.getMonth()) {
    return true;
  }
  return false;
};
