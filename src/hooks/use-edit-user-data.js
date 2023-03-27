import { useSelector } from 'react-redux';
import { dataDefaultValueForm } from '../data/data-default-value-form';

export const useEditUserData = () => {
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

    if (userData?.password !== dataDefaultValueForm.password) {
      editUser.password = userData?.password;
    }
  };

  return { editUser, editUserData };
};
