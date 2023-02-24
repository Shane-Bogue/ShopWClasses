class Product {
    constructor(name,price,unitsAvailable,unitsInCart) {
        this.name = name;
        this.price = price;
        this.unitsAvailable = unitsAvailable;
        this.unitsInCart = unitsInCart || 0;
    }
}

class Cart {
    static Add(product) {
        if (!productCart.includes(product)) productCart.unshift(product)
        productCart[productCart.indexOf(product)].unitsInCart++
        productCart[productCart.indexOf(product)].unitsAvailable--
        Display.Refresh()
    }

    static Remove(product) {
        productCart[productCart.indexOf(product)].unitsInCart--
        productCart[productCart.indexOf(product)].unitsAvailable++
        if (productCart[productCart.indexOf(product)].unitsInCart == 0 ) productCart.splice([productCart.indexOf(product)],1)
        Display.Refresh()
    }
}

class Display {
    static Refresh() {
        this.Clear()
        products.forEach(product => {
            const div = document.createElement('div')
            const name = document.createElement('p')
            const cost = document.createElement('p')
            const avail = document.createElement('p')
            const inCart = document.createElement('p')
            name.textContent = product.name
            cost.textContent = '$' + product.price
            avail.textContent = product.unitsAvailable + ' Left In Stock'
            inCart.textContent = product.unitsInCart + ' In Your Cart'
            div.append(name,cost,avail,inCart)
            UI.products.append(div)

            div.addEventListener('click', function(){
                product.unitsAvailable > 0? Cart.Add(product): console.log('Sold Out')
            })
        })

        productCart.forEach(product => {
            const div = document.createElement('div')
            div.textContent = `${product.name} ${product.price} X${product.unitsInCart}`
            UI.productCart.append(div)

            div.addEventListener('click', function(){
                Cart.Remove(product)
            })
        })
    }

    static Clear() {
        UI.products.textContent = ''
        UI.productCart.textContent = ''
    }
}

let productCart = []

let products = [
    new Product('Toilet Paper (12 rolls)', 4.99, 2000),
    new Product('Poo Spray', 3.99, 3),
    new Product('Plunger', 9.99, 1)
]

const UI = {
    products: document.getElementById('products'),
    productCart: document.getElementById('productCart')
}

Display.Refresh()


