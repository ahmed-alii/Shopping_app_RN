export let GIFTS = {
    "Wood Watch": {image: "https://source.unsplash.com/300x200/?Wooden+wrist+Watch", price: 200, shipping: 3, color: "Black"},
    "Box of Chocolates": {image: "https://source.unsplash.com/300x200/?Chocolate", price: 100, shipping: 3, color: "Blue-Black"},
    "Xbox Gift Pack": {image: "https://source.unsplash.com/300x200/?Xbox", price: 500, shipping: 3, color: "Yellow"},
    "Netflix Gift Pack": {image: "https://source.unsplash.com/300x200/?Netflix", price: 20, shipping: 3, color: "Orange"},
    "Mystery Box": {image: "https://source.unsplash.com/300x200/?Gift+Box", price: 90, shipping: 3, color: "Red, Black"},
    "Super RC Car": {image: "https://source.unsplash.com/300x200/?Audi", price: 299, shipping: 3, color: "Silver, Black"},
    "Silver Wrist Watch": {image: "https://source.unsplash.com/300x200/?Wrist+watch+silver", price: 420, shipping: 3, color: "Silver"},

}

export function searchGifts(querry) {
    let suggestions = {};
    for(let index in GIFTS){
        if (index.includes(querry)){
            suggestions[index] = GIFTS[index]
        }
    }
    return suggestions
}