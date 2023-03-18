import { useState } from 'react';
import { useSelector } from 'react-redux';

export const useGetBook = (id) => {
  const books = useSelector((state) => state.books.books);

  let currentBook = {};
  books.forEach((element) => {
    if (element.id === +id) {
      currentBook = element;
    }
    return null;
  });

  return currentBook;
};
