import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

export const useEditUserData = () => {
  // const [userData, setUserData] = useState(data);

  const editUser = {};

  let userAuth = useSelector((state) => state.authenticationUser.user);
  if (userAuth === null || (userAuth !== null && userAuth !== undefined && !Object.keys(userAuth).length)) {
    userAuth = JSON.parse(localStorage.getItem('userAuth'));
  }

  const editUserData = (userData) => {
    if (userData?.username !== userAuth.username) {
      editUser.username = userData?.username;
    }
    if (userData?.firstName !== userAuth.firstName) {
      editUser.firstName = userData?.firstName;
    }
    if (userData?.lastName !== userAuth.lastName) {
      editUser.lastName = userData?.lastName;
    }
    if (userData?.phone !== userAuth.phone) {
      editUser.phone = userData?.phone;
    }

    if (userData?.email !== userAuth.email) {
      editUser.email = userData?.email;
    }

    editUser.password = userData?.password;
  };

  // console.log('editUser', editUser);

  return { editUser, editUserData };
};
