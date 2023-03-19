export const correctDate = (dateBooking) => {
  const dateFormat = new Date(!!dateBooking && dateBooking);
  dateFormat?.setHours(dateFormat.getHours() + 3);
  const isoDate = dateBooking?.toISOString();
  return isoDate;
};
