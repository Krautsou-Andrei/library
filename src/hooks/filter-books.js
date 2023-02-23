import { useSelector } from 'react-redux';

export const useFilterBooks = (allBooks) => {
  const category = useSelector((state) => state.filter.currentCategotyTitle);
  const isOrder = useSelector((state) => state.filter.isOrder);

  const sortBooks = [...allBooks].sort((a, b) => Number(b.rating) - Number(a.rating));

  const filterbooks =
    category === 'Все книги' ? sortBooks : sortBooks.filter((book) => book.categories.includes(category));

  if (!isOrder) {
    filterbooks.reverse();
  }
  return filterbooks;
};
