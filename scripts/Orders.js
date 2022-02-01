import { getOrders, getMetals, getSizes, getStyles } from "./database.js"



// function that adds the cost of metals to total cost
const metalCost = (order) => {
    const metals = getMetals();
    const foundMetal = metals.find(
        (metal) => {
            return metal.id === order.metalId
        }
    )
    let totalCost = foundMetal.price
    return totalCost
}

// function to add the cost of sizes
const sizeCost = (order) => {
    const sizes = getSizes();
    const foundSize = sizes.find(
        (size) => {
            return size.id === order.sizeId
        }
    )
    let totalCost = foundSize.price
    return totalCost
}

// function to add the cost of styles
const styleCost = (order) => {
    const styles = getStyles();
    const foundStyle = styles.find(
        (style) => {
            return style.id === order.styleId
        }
    )
    let totalCost = foundStyle.price
    return totalCost

}

//function that adds the total cost of each element together
const addCost = (order) => {
    const metalPrice = metalCost(order);
    const sizePrice = sizeCost(order);
    const stylePrice = styleCost(order)
    const totalCost = metalPrice + sizePrice + stylePrice
    return totalCost
}

//string that displays order cost
const buildOrders = (order) => {
    const totalCost = addCost(order)
    const costString = totalCost.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    })
    
     return   `<li>
    Order #${order.id} cost ${costString}
</li>`

    
}

//function to put together all order components and print HTML
export const Orders = () => {

    const orders = getOrders()

    let html = "<ul>"

    const listItems = orders.map(buildOrders)

    html += listItems.join(" ")
    html += "</ul>"

    return html
}

