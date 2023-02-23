import { useState } from 'react';

import placeholder from './icon_review_avatar.svg';

export const ImageUser = ({ src, width, height, className }) => {
  const [image] = useState(src ? src : placeholder);
  const [widthImage] = useState(src ? width : 32);
  const [heightImage] = useState(src ? height : 32);

  return <img className={className} src={image} alt='' width={widthImage} height={heightImage} />;
};
