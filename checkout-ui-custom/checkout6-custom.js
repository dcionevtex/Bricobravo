// This is an example
function setVtexAppsConfig(vtexAppsConfig, appName) {
  if (appName == 'checkout-v6-invoice-data') {
    vtexAppsConfig.locale = 'it'
    vtexAppsConfig.invoiceDataMandatory = false
    vtexAppsConfig.showSDIPECSelector = true
    vtexAppsConfig.showPersonTypeSelector = true
    vtexAppsConfig.defaultSDIPEC = 'sdi'
    vtexAppsConfig.defaultPersonType = 'company'
    vtexAppsConfig.requiredFields.it = {
      profile: ['user-person-type', 'custom-corporate-name'],
      address: ['custom-corporate-street'],
    }
  }
}

async function setFiscalData() {
  const { orderFormId } = await vtexjs.checkout.getOrderForm()
  const URL = `/api/checkout/pub/orderForm/${orderFormId}/customData/fiscalData`
  const fieldsFiscalData = {
    requestInvoice: true,
    typeOfDocument: 'private',
    codiceFiscaleAzienda: 'RSSMRA74D22A001Q',
    sendInvoiceTo: false,
    SDIPEC: '212121212121',
    useShippingAddress: true,
  }

  const request1 = await putFiscalData(fieldsFiscalData, URL)
  console.log(request1)
}

async function putFiscalData(fields, URL) {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(fields),
  }

  return fetch(URL, options).then((res) => console.log(res))
}

document.addEventListener('DOMContentLoaded', function (e) {
  setTimeout(() => {
    setFiscalData()
  }, 1000)
})
