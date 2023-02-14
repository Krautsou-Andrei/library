import { Link, useParams } from 'react-router-dom';

export const Breadcrumbs = ({ categoryTitle, label }) => {
  const { category } = useParams();

  return (
    <div className='breadcrumbs__wrapper wrapper'>
      <nav className='bradcrumbs' aria-label='Breadcrumb'>
        <ol className='breadcrumbs__list'>
          <li className='breadcrumbs__item'>
            <Link to={`/books/${category}`} className='bradcrumbs__page'>
              {categoryTitle}
            </Link>
          </li>
          <li className='breadcrumbs__item'>
            <span className='breadcrumbs__page breadcrumbs__page--current' aria-current='page'>
              {label}
            </span>
          </li>
        </ol>
      </nav>
    </div>
  );
};
