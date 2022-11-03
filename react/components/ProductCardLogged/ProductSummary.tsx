import React from 'react'
// import { Link } from 'react-router-dom'

interface ProductSummaryProps {
    linkProduct: string | any
    lastProductCart: string | any
    transformCoinEuroListPrice: string
    adjustDecimaisListPrice: number
    transformCoinEuroSellingPrice: string
    style: any
}

export default function ProductSummary({ 
    style,  
    linkProduct, 
    lastProductCart, 
    transformCoinEuroListPrice, 
    adjustDecimaisListPrice, 
    transformCoinEuroSellingPrice
}:ProductSummaryProps) {
  return (
    <a className={style.linkCardProductLogged} href={`${linkProduct}`}>
        <img className={style.cardProduct_Image} src={`https:${lastProductCart?.imageUrls?.at1x}`} alt={lastProductCart?.name} />
        <div className={style.container_InfoProducts}>
            <h3 className={style.cardProduct_TitleProduct}>{lastProductCart?.name}</h3>
            <span className={style.cardProduct_ListPrice}>{transformCoinEuroListPrice}</span> 
            <span className={
                adjustDecimaisListPrice 
                    ? 
                style.cardProduct_PriceL
                    : 
                style.cardProduct_Price}
            >{transformCoinEuroSellingPrice}</span>
        </div>
    </a>
  )
}
