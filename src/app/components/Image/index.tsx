import { forwardRef, useState } from 'react';
import classNames from 'classnames';

import noImage from 'assets/images/no-image.png';
import styles from './Image.module.scss';

interface Props {
  src: string;
  alt?: string;
  className?: string;
  fallback?: string;
}

const Image = forwardRef(
  (
    { src, alt = 'image', className, fallback = noImage, ...props }: Props,
    ref: any,
  ) => {
    const [_fallback, setFallback] = useState('');

    const handleError = () => {
      setFallback(fallback);
    };

    return (
      <img
        className={classNames(styles.wrapper, className)}
        ref={ref}
        src={src || _fallback}
        alt={alt}
        {...props}
        onError={handleError}
      />
    );
  },
);
export default Image;
