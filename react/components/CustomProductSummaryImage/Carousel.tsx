import type { TouchEventHandler } from 'react'
import React, { useState } from 'react'

import style from './style.css'

interface HandleInputRadioChangeProps {
  target: HTMLInputElement
}

interface CarouselItemProps {
  children: JSX.Element
  width?: string
}

export function CarouselItem({ children, width }: CarouselItemProps) {
  return (
    <div className={`${style.carouselItem}`} style={{ width }}>
      {children}
    </div>
  )
}

export default function Carousel({ children }: any) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [touchIndex, setTouchIndex] = useState(0)

  const updateIndex = (newIndex: number) => {
    if (newIndex < 0) {
      newIndex = 0
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = React.Children.count(children) - 1
    }

    setActiveIndex(newIndex)
  }

  const handleTouchIndexStart = ({ changedTouches }: TouchEvent) => {
    setTouchIndex(changedTouches[0]?.screenX)
  }

  const handleTouchIndex = ({ changedTouches }: TouchEvent) => {
    if (touchIndex > changedTouches[0]?.screenX) {
      updateIndex(activeIndex + 1)
    } else {
      updateIndex(activeIndex - 1)
    }
  }

  const sectionRadio = children[0]?.props?.children?.props?.imageProps?.src

  return (
    <div className={style.carousel}>
      <div
        className={style.inner}
        onTouchStart={(e: TouchEventHandler | any) => {
          handleTouchIndexStart(e)
        }}
        onTouchEnd={(e: TouchEventHandler | any) => {
          handleTouchIndex(e)
        }}
        style={{ transform: `translateX(-${activeIndex * 34}%)` }}
      >
        {React.Children.map(children, (child, _index) => {
          return React.cloneElement(child, { width: '100%' })
        })}
      </div>
      <div className={style.indicators}>
        {React.Children.map(children, (_child, index) => (
          <label htmlFor={`radio${sectionRadio}${index}`}>
            <input
              type="radio"
              id={`radio${index}`}
              onFocus={({ target }: HandleInputRadioChangeProps) => {
                updateIndex(index)
                target.checked = true
              }}
              name={`indicatorDot${sectionRadio}`}
              checked={index === activeIndex}
              className={`${style.indicatorDots}`}
            />
          </label>
        ))}
      </div>
    </div>
  )
}
