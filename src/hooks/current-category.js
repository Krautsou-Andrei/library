import { useSelector } from 'react-redux';

export const useCurrentCategory = (category) => {
  const categories = useSelector((state) => state.categories.categories);

  let currentCategotyTitle = 'Все книги';
  let currentCategoryPath = 'all';

  if (categories) {
    categories.forEach((item) => {
      if (item.path === category) {
        currentCategotyTitle = item.name;
        currentCategoryPath = item.path;
      }
      if (category === 'all') {
        currentCategotyTitle = 'Все книги';
        currentCategoryPath = 'all';
      }
    });
  }

  return [currentCategotyTitle, currentCategoryPath];
};
