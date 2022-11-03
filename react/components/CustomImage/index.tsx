import React from 'react'
// import { useDevice } from 'vtex.device-detector'
// import { changeImageUrlSize } from '../../utils/normalize'
// import { imageUrl } from '../../utils/aspectRatioUtil'

// const MAX_SIZE = 500
// const DEFAULT_SIZE = 300

type GetStyleParams = {
  width?: number
  height?: number
  aspectRatio?: string | number
  maxHeight?: string
}

function getStyle({ width, height, aspectRatio, maxHeight }: GetStyleParams) {
  if (width || height) {
    return {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      maxHeight: 'unset',
      maxWidth: width,
    } as React.CSSProperties
  }

  if (aspectRatio || maxHeight) {
    return {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      maxHeight: maxHeight ?? 'unset',
    } as React.CSSProperties
  }

  return undefined
}

// type GetImageSrcParams = {
//   src: string
//   width: number
//   height: number
//   dpi: number
//   aspectRatio?: string | number
// }

// function getImageSrc({
//   src,
//   width,
//   height,
//   dpi,
//   aspectRatio,
// }: GetImageSrcParams) {
//   if (width || height) {
//     return changeImageUrlSize(src, width * dpi, height * dpi)
//   }

//   if (aspectRatio) {
//     return imageUrl(src, DEFAULT_SIZE, MAX_SIZE, aspectRatio)
//   }

//   return src
// }

interface ImageProps {
  src: string
  width?: number
  height?: number
  onError: () => void
  alt: string
  className: string
  aspectRatio?: string | number
  maxHeight?: string
}

function CustomImage({
  src,
  width,
  height,
  onError,
  alt,
  className,
  aspectRatio,
  maxHeight,
}: ImageProps) {
  // const { isMobile } = useDevice()

  /** TODO: Previously it was as follows :
   *
  const dpi = window.devicePixelRatio || (isMobile ? 2 : 1)
   *
   * it seems good, because it takes the actual user's screen density
   * into account, but causes images to be re-downloaded if the initial
   * device-based guess was wrong. Has to be looked into */
  // const dpi = isMobile ? 2 : 1

  const shouldResize = !!(width || height)

  return (
    <img
      // src={getImageSrc({ src, width, height, dpi, aspectRatio })}
      src={src}
      style={getStyle({ width, height, aspectRatio, maxHeight })}
      // @ts-expect-error This property exists in HTML
      loading={shouldResize ? 'lazy' : 'auto'}
      alt={alt}
      className={className}
      onError={onError}
    />
  )
}

export default CustomImage
