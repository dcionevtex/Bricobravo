import React, { Fragment, useEffect, useState } from 'react'
import { OrderForm } from 'vtex.order-manager'

import { SessionSuccess, useFullSession } from 'vtex.session-client'

import ProductSummary from './ProductSummary'
import ProductSummaryWish from './ProductSummaryWish'
import ProductSummaryMin from './ProductSummaryMin'
import style from './styles.css'
import GetItensWishlistByEmail from '../GetItemsWishlistByEmail'
import GetItemOrder from '../GetItemOrder'

export default function ProductCardLogged() {
  
  const { data } = useFullSession()
  const { namespaces } = ((data?.session as unknown) as SessionSuccess) ?? {}
  const isAuthenticated = namespaces?.profile?.isAuthenticated?.value;

  const { useOrderForm } = OrderForm
  const { orderForm } = useOrderForm()
  const { items } = orderForm

  const lastProductCart = items[items.length - 1]
  const linkProduct = lastProductCart?.detailUrl

  const adjustDecimaisSellingPrice = lastProductCart?.sellingPrice / 100
  const adjustDecimaisListPrice = lastProductCart?.listPrice / 100

  const transformCoinEuroSellingPrice =
    items.length > 0
      ? adjustDecimaisSellingPrice.toLocaleString('de-DE', {
          style: 'currency',
          currency: 'EUR',
        })
      : (0.0).toLocaleString('de-DE', {
          style: 'currency',
          currency: 'EUR',
        })

  const transformCoinEuroListPrice = adjustDecimaisListPrice.toLocaleString(
    'de-DE',
    { style: 'currency', currency: 'EUR' }
  )

  const [isAuthenticatedState, setisAuthenticatedState] = useState(false);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [lastOrderProduct, setLastOrderProduct] = useState<any>({});

  useEffect(() => {

    if (isAuthenticated === 'true') {
      setisAuthenticatedState(true);
      // const storeUserId = namespaces?.authentication?.storeUserId?.value;
      const storeUserEmail = namespaces?.authentication?.storeUserEmail?.value;
      GetItensWishlistByEmail(storeUserEmail)
        .then((res) => setWishlistProducts(res))
      
      GetItemOrder().then((res) => setLastOrderProduct(res))  

    } else {
      setisAuthenticatedState(false);
    }

  }, [ data ])

  return (
    <Fragment>
      <div className={
        isAuthenticatedState === true ? style.containerMain : style.hideContainerMain
      }>
        <div className={style.containerCards_productLogged}>
          <div className={style.cardProduct_lastProduct}>
            <p className={style.cardProduct_Title}>Continua ad acquistare</p>
            <div className={
              lastProductCart !== undefined ? style.containerMain : style.hideContainerMain
            }>
              <ProductSummary
                style={style}
                linkProduct={linkProduct}
                lastProductCart={lastProductCart}
                transformCoinEuroListPrice={transformCoinEuroListPrice}
                adjustDecimaisListPrice={adjustDecimaisListPrice}
                transformCoinEuroSellingPrice={transformCoinEuroSellingPrice}
              />
            </div>
          </div>
          <div className={style.cardProduct_Wishlist}>
            <p className={style.cardProduct_Title}>La tua lista dei desideri</p>
            <div className={style.cardProduct_WishlistContainerProducts}>
          
              { wishlistProducts.map(({ skus }: any) => {
                return (
                  <ProductSummaryWish 
                    name={skus[0].skuname}
                    link={skus[0].skuname}
                    image={skus[0].image}
                    price={skus[0].bestPrice} 
                    decimalPrice={skus[0].spotPrice} 
                    transformPrice={skus[0].bestPriceFormated} 
                    style={style}
                  />
                  )
                })
              }               
            </div>
          </div>
          <div className={style.cardProduct_lastPurchase}>
            <p className={style.cardProduct_Title}>I miei ordini</p>
            <div className={
              lastOrderProduct.detailUrl !== undefined ? style.containerMain : style.hideContainerMain
            }>
              <ProductSummaryMin
                style={style}
                linkProduct={lastOrderProduct.detailUrl}
                lastProductCart={lastOrderProduct.imageUrl}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
    
  )
}
