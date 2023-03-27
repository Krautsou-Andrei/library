import { useState } from 'react';

import placeholder from './image-cat.svg';

export const ImageUser = ({ src, width, height, className }) => {
  const [image] = useState(src ? src : placeholder);
  const [widthImage] = useState(src ? width : 40);
  const [heightImage] = useState(src ? height : 40);

  return <img className={className} src={image} alt='' width={widthImage} height={heightImage} />;
};
