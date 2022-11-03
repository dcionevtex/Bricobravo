import React, { useEffect, useState } from 'react'
import { createStore } from 'state-pool';
import { Wrapper as AddToCartButton } from 'vtex.add-to-cart-button'
import { usePixel } from "vtex.pixel-manager"
import { NumericStepper } from 'vtex.styleguide'
import { useProduct }  from 'vtex.product-context'
import { OrderForm } from 'vtex.order-manager'
import { useOrderItems } from 'vtex.order-items/OrderItems'

import './global.css'


const { useOrderForm } = OrderForm
const store = createStore()
store.setState("alreadyOpenCart", false);

type BuyButtonProps = {
  text: string
  onClickEventPropagation: string
}

const BuyButton: StorefrontFunctionComponent<BuyButtonProps> = ({
  text = "Aggiungi al carrelo",
  onClickEventPropagation = "disabled"
}) => {

  const [isInCart, setIsInCart] = useState(false)

  const [alreadyOpenCart, setAlreadyOpenCart] = store.useState("alreadyOpenCart");

  const [inCartQuantity, setInCartQuantity] = useState(0)

  const {orderForm: { items }} = useOrderForm()
  const { updateQuantity } = useOrderItems()

  const { selectedItem } = useProduct() ?? {}
  const productContextValue = useProduct() ?? {} 

  const { push } = usePixel() 

  useEffect(() => {
    if (!selectedItem || !items) return
    const result = items.find((item: any) => item.id === selectedItem.itemId)
    
    if (!result) return setIsInCart(false)  

    setIsInCart(true)
    setInCartQuantity(result.quantity)

  }, [items, selectedItem])

  const changeQuantityCart = (event: any) => {
    items?.map((items: any) => {   
      if (items?.id == productContextValue?.selectedItem?.itemId) {
        updateQuantity({uniqueId: items?.uniqueId, quantity: event.value})
      }
    })
  }

  const checkAlreadyOpenCart = () => {
    if(!alreadyOpenCart && !items.length) {
      push({
        // @ts-ignore
        event: "minicart-open-name",  
        id: "minicart-open"
      })
      setAlreadyOpenCart(true)
    }
  }
  

  return (
    <div onClick={(event) => {
      event.preventDefault()
      event.stopPropagation()
    }} style={{alignSelf: "center"}}>
      {isInCart ? (
        // TODO minimum value and max (availabityitem); unitmutiplier 
        <NumericStepper
          minValue={0}
          value={inCartQuantity}
          showUnit={false}
          showLabel={false}
          onChange={changeQuantityCart}
        />
      ) : (
        <div onClick={() => checkAlreadyOpenCart()}>
          <AddToCartButton text={text} onClickEventPropagation={onClickEventPropagation}/>
        </div>
      )}
    </div>
  )
}

BuyButton.schema = {
  title: 'Buy Button Text',
  type: 'object',
  properties: {
    text: {
      title: 'Text',
      description: 'Label Buy Button',
      type: 'string',
      default: 'Comprar agora!',
    },
    onClickEventPropagation: {
      title: 'onClickEventPropagation',
      description: 'onClickEventPropagation',
      type: 'string',
      default: 'disabled',
    },
  },
}

export default BuyButton
