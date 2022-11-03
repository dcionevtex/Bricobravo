import React from 'react'
import { FormattedPrice } from 'vtex.formatted-price'
// import { Link } from 'react-router-dom'

interface ProductSummaryProps {
  name: string | any
  link: string | any
  image: string | any
  price: string
  decimalPrice: number
  transformPrice: string
  style: any
}

export default function ProductSummaryWish({
  name,
  link,
  image,
  price,
  decimalPrice,
  transformPrice,
  style,
}: ProductSummaryProps) {
  return (
    <a className={style.linkCardProductLogged} href={`${link}`}>
      <img className={style.cardProduct_Image} src={`${image}`} alt={name} />
      <div className={style.container_InfoProducts}>
        <h3 className={style.cardProduct_TitleProduct}>{name}</h3>
        <div className={style.cardProduct_priceWish}>
          <span className={style.cardProduct_ListPrice}>
            <FormattedPrice value={+price} />
          </span>
          <span
            className={
              decimalPrice ? style.cardProduct_PriceL : style.cardProduct_Price
            }
          >
            {transformPrice}
          </span>
        </div>
      </div>
    </a>
  )
}
