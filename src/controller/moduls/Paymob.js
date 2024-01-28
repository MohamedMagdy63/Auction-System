const API = 'ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2TnpZeU16SXpMQ0p1WVcxbElqb2lhVzVwZEdsaGJDSjkucDJXMEFGQ0lBZWQzLWtNVmNnaEdTVllzZnd6dUtiZW5Nb3I5Zi1MUzdDZk1TUEJ4N013NjdXaVdMYnhiSl9qUG9jTXBNdHczdjlkYk1id1ZQdUkzVnc='

const authenticationRequest = async()=>{
    let data = {
        "api_key": API
    }
    let responce = await fetch('https://accept.paymob.com/api/auth/tokens',{
        method :'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(data)
    })
    const json = responce.json()
    return(json)
}
const makeOrder = async(token,price)=>{
    let data = {
        "auth_token":  token,
        "delivery_needed": "false",
        "amount_cents": `${price}`,
        "currency": "EGP",
        "items": []
      }
    let responce = await fetch('https://accept.paymob.com/api/ecommerce/orders',{
        method :'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(data)
    })
    const json = responce.json()
    return(json)
}
const paymentKeyRequest = async(token,price,id)=>{
    let data = {
        "auth_token": token,
        "amount_cents": `${price}`, 
        "expiration": 3600, 
        "order_id": `${id}`,
        "billing_data": {
          "apartment": "803", 
          "email": "claudette09@exa.com", 
          "floor": "42", 
          "first_name": "Clifford", 
          "street": "Ethan Land", 
          "building": "8028", 
          "phone_number": "+86(8)9135210487", 
          "shipping_method": "PKG", 
          "postal_code": "01898", 
          "city": "Jaskolskiburgh", 
          "country": "CR", 
          "last_name": "Nicolas", 
          "state": "Utah"
        }, 
        "currency": "EGP", 
        "integration_id": 3760849,
      }
    let responce = await fetch('https://accept.paymob.com/api/acceptance/payment_keys',{
        method :'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(data)
    })
    const json = responce.json()
    return(json)
}

export const paymobIframeCreate = (price)=>{
    authenticationRequest().then((token)=>{
        makeOrder(token.token,price).then((orderID)=>{
            paymentKeyRequest(token.token,price,orderID.id).then((finalToken)=>{
                window.open(`https://accept.paymob.com/api/acceptance/iframes/755620?payment_token=`+finalToken.token, '_blank');
            })
        })
    })
}