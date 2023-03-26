import { useState } from 'react';
import { useSelector } from 'react-redux';

export const useUserComments = (bookId) => {
  let comment = '';
  let userAuth = useSelector((state) => state.authenticationUser.user);
  if (!Object.keys(userAuth).length || userAuth === null) {
    userAuth = JSON.parse(localStorage.getItem('userAuth'));
  }

  if (userAuth?.comments?.length > 0) {
    userAuth.comments.forEach((element) => {
      if (element.bookId === +bookId) {
        comment = element;
      }
      return comment;
    });
  }

  return comment;
};
