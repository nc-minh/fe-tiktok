import { forwardRef, useState } from 'react';
import classNames from 'classnames';

import images from '~/assets/images';
import styles from './Image.module.scss';

const Image = forwardRef(({ src, alt, className, fallback = images.noImage, ...props }, ref) => {
  const [_fallback, setFallback] = useState('');

  const handleError = () => {
    setFallback(fallback);
  };

  return (
    <img
      className={classNames(styles.wrapper, className)}
      ref={ref}
      src={_fallback || src}
      alt={alt}
      {...props}
      onError={handleError}
    />
  );
});

export default Image;
