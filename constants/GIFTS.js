export let GIFTS = {
    "Wood Watch": {image: "https://source.unsplash.com/300x200/?Wood+Watch", price: 123, shipping: 3, color: "black"},
    "Box of Chocolates": {image: "https://source.unsplash.com/300x200/?Chocolate", price: 123, shipping: 3, color: "black"},
    "Xbox Gift Pack": {image: "https://source.unsplash.com/300x200/?Xbox", price: 123, shipping: 3, color: "black"},
    "Netflix Gift Pack": {image: "https://source.unsplash.com/300x200/?Netflix", price: 123, shipping: 3, color: "black"},
    "Mystery Box": {image: "https://source.unsplash.com/300x200/?Gift+Box", price: 123, shipping: 3, color: "black"},
    "Super RC Car": {image: "https://source.unsplash.com/300x200/?RC+car", price: 123, shipping: 3, color: "black"},
    "Silver Wrist Watch": {image: "https://source.unsplash.com/300x200/?Wrist+watch+silver", price: 123, shipping: 3, color: "black"},

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