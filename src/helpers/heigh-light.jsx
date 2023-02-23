export const Heighlight = (searchParams, title, className) => {
  if (!searchParams) {
    return title;
  }

  const regExp = new RegExp(searchParams, 'ig');
  const matchValues = title.match(regExp);

  if (matchValues) {
    return title.split(regExp).map((string, index, array) => {
      const match = matchValues.shift();
      if (index < array.length - 1) {
        return (
          <span key={`${index + 1}`}>
            {string}
            <span className='heighlight' data-test-id='highlight-matches'>
              {match}
            </span>
          </span>
        );
      }

      return title;
    });
  }

  return title;
};
