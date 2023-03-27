const user = JSON.parse(localStorage.getItem('user'));

export const sortComments = (comments) => {
  const sortComments = [...comments].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return sortComments;
};

export const isCommentsCurrentUser = (comments) => {
  let isCurrentUser = false;

  if (comments && comments.length > 0) {
    comments.forEach((element) => {
      if (element?.user?.commentUserId === user?.id) isCurrentUser = true;
    });
  }
  return isCurrentUser;
};
