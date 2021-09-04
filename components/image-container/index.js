import React from 'react'
import clsx from "clsx";
import css from '../../styles/components/image-container/image-container.module.scss'
import cssImage from "../../styles/components/image/image.module.scss";
import Image from "next/image";

const ImageContainer = ({ className, src, alt }) => (
  <div className={clsx(css.imageContainer, className)}>
    {src && <Image
      src={src}
      alt={alt}
      layout={'fill'}
      className={clsx(cssImage.imageCover, className)}
    />}
    {!src && <div>{alt}</div>}
  </div>
)

export default ImageContainer
