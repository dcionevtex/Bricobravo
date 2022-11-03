import { useEffect } from 'react';
import { useProduct } from 'vtex.product-context'

const SellerSpedizione = () => {

    const productContextValue = useProduct();

    const [shippingDays, setShippingDays] = React.useState();
    const [shippingPrice, setShippingPrice] = React.useState();
    
    function formatShippingData (productShippingInfo) {     
        
        let [logisticsInfo] = productShippingInfo.logisticsInfo;
        let { shippingEstimate, price } = logisticsInfo.slas[0]
        let substringToReplace = (shippingEstimate.includes("bd") ? "bd" : "d");
        
        shippingEstimate = shippingEstimate.replace(substringToReplace, " giorni lavorativi");
        
        if (price === 0) {
            price = "gratuita";
        } else {
            price = `${(price/100)?.toLocaleString('BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })} €`
        }
        
        setShippingDays(shippingEstimate); 
        setShippingPrice(price);                 
    }

    async function fetchProductShippingData(product) {

        const options = {
            method: "post",
            body: JSON.stringify({
                items: [{
                    id: product.items[0].itemId,
                    quantity: '1',
                    seller: product.items[0].sellers[0].sellerId,
                }],
                country: 'ITA',
                postalCode: '00005021'
            }),
            headers: {'Content-Type': 'application/json'}
        }
        try {
            const productShippingInfo = await fetch("/api/checkout/pub/orderForms/simulation", options)
            .then( resp => resp.json())

            return productShippingInfo
        } catch(err) {
            console.error(err)
        }       
    }

    useEffect(() => {
        if (productContextValue.product) {
            fetchProductShippingData(productContextValue.product).then((info) => formatShippingData(info));                 
        }
    }, [])
    

    return (
        <>
        {shippingDays && (
        <div>
            <p class="vtex-rich-text-0-x-paragraph--pdp-shipping-info">Consegna stimata entro <span class="vtex-rich-text-0-x-strong--pdp-shipping-info">{shippingDays}</span><br></br>Spedizione <span class="vtex-rich-text-0-x-strong--pdp-shipping-info">{shippingPrice}</span></p>
        </div>
        )}
        </>
    )
}

export default SellerSpedizione
