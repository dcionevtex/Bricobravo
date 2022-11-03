import React from 'react'
import { useProduct } from 'vtex.product-context'
import { useDevice } from 'vtex.device-detector'

import CustomImage from '../CustomImage'
import Carousel, { CarouselItem } from './Carousel'

import './style.css'

const CustomProductSummaryImage: React.FC = () => {
  const product = useProduct()

  const { isMobile } = useDevice()

  const selectedItem = product?.selectedItem

  if (!selectedItem) {
    return null
  }

  const MEDIUMSCREEN = 1024

  return (
    <div
      onClick={function (e) {
        if (window.screen.width <= MEDIUMSCREEN) {
          e.preventDefault()
          e.stopPropagation()
        }
      }}
    >
      {!isMobile ? (
        <CustomImage
          src={selectedItem.images[0].imageUrl}
          maxHeight={'194px'}
          alt={selectedItem.images[0].imageLabel}
          className={''}
          onError={() => {}}
        />
      ) : (
        <div style={{ paddingBottom: '1rem' }}>
          {selectedItem?.images.length > 1 ? (
            <Carousel>
              {selectedItem?.images.slice(0, 3).map((image) => {
                return (
                  <CarouselItem>
                    <img src={image.imageUrl} alt={image.imageLabel} />
                  </CarouselItem>
                )
              })}
            </Carousel>
          ) : (
            <div>
              <CustomImage
                src={selectedItem.images[0].imageUrl}
                maxHeight={'194px'}
                alt={selectedItem.images[0].imageLabel}
                className={''}
                onError={() => {}}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CustomProductSummaryImage
