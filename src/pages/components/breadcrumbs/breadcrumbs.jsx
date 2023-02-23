import { Link, useParams } from 'react-router-dom';

import { booksApi } from '../../../redux';

import stylesLayout from '../../../layout/layout/wrapper.module.scss';
import styles from './breadcrumbs.module.scss';

export const Breadcrumbs = ({ categoryTitle, label }) => {
  const { category } = useParams();
  const [trigger] = booksApi.useLazyGetBooksQuery();

  return (
    <div className={`${styles.breadcrumbs__wrapper} ${stylesLayout.wrapper}`}>
      <nav className={styles.bradcrumbs} aria-label='Breadcrumb'>
        <ol className={styles.breadcrumbs__list}>
          <li className={styles.breadcrumbs__item}>
            <Link
              to={`/books/${category}`}
              className={styles.bradcrumbs__page}
              data-test-id='breadcrumbs-link'
              onClick={() => trigger()}
            >
              {categoryTitle}
            </Link>
          </li>
          <li className={styles.breadcrumbs__item}>
            <span className={styles.breadcrumbs__page} aria-current='page' data-test-id='book-name'>
              {label}
            </span>
          </li>
        </ol>
      </nav>
    </div>
  );
};
