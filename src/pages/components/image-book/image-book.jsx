import { useState } from 'react';

import placeholder from './empty_cat.svg';

export const ImageBook = ({ src, width, height, className }) => {
  const [image] = useState(src ? src : placeholder);
  const [widthImage] = useState(src ? width : 48);
  const [heightImage] = useState(src ? height : 48);

  return <img className={className} src={image} alt='' width={widthImage} height={heightImage} />;
};
