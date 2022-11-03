
// Função que retorna os produtos do wishlist
export default async function GetItemsWishlistByEmail(
  storeUserEmail: string
): Promise<any> {

  function getLastProduct(listItens: any) {

    const lastWishlistProducts = listItens[0].ListItemsWrapper[0].ListItems
    
    const sizeListItens = lastWishlistProducts.length
       
    if (sizeListItens === 0) return 'Sem Favoritos'
        
    return sizeListItens > 1
      ? [lastWishlistProducts[sizeListItens - 1], lastWishlistProducts[sizeListItens - 2]]
      : lastWishlistProducts[sizeListItens - 1]
  }

  async function getItensWishlist() {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    try {
      // Verificar um endpoint que retorne as informações já filtradas pelo email ao inves de puxar tudo e fazer o filtro por aqui
      const response: any = await fetch(
        `/api/dataentities/wishlist/search?_schema=wishlist&email=${storeUserEmail}`,
        // `/api/dataentities/wishlist/search?${emailUserLogged}`,
        options
      ).then((res) => res.json()).catch((err) => console.log(err))
      // const wishlistUser = filterByEmailWishlist(emailUserLogged, response)

      // console.log(wishlistUser, 'WISHLIST DO USUSARIO LOGADO')

      return getLastProduct(response)
    } catch (err) {
      console.log(err)
    }
  }

  const resp = await getItensWishlist().then((res) => res)

  let listProductsWishAll: any = []

  
  for await (const products of await Promise.all(resp
    .map((e: any) => fetch(`/api/catalog_system/pub/products/variations/${e.ProductId}`)
    .then((product: (any)) => product.json())))) {
      products !== 'ProductId not found' ? listProductsWishAll.push(products) : null
  }
  
  return listProductsWishAll
}
