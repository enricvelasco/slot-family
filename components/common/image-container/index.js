import React from 'react'
import clsx from "clsx";
import css from '../../../styles/components/image-container/image-container.module.scss'
import Image from "next/image";

const ImageContainer = ({ className, src, alt, objectFit = 'cover' }) => (
  <div className={clsx(css.imageContainer, className)}>
    {src && <Image
      src={src}
      alt={alt}
      objectFit={objectFit}
      layout={'fill'}
    />}
    {!src && <div>{alt}</div>}
  </div>
)

export default ImageContainer
