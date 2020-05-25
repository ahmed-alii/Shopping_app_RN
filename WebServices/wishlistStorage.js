import {AsyncStorage} from "react-native";

let key = "wishlist";

export const saveWishlist = async (data) => {
    let array = [];
    array.push(data)

    try {
        getWishlist().then(r => {
            console.log(r)
            if (r === undefined) {
                AsyncStorage.setItem(key, JSON.stringify(array));
            } else {
                r.push(data)
                AsyncStorage.setItem(key, JSON.stringify(r));
            }
        })
    } catch (error) {
        console.error(error)
    }
};

export const getWishlist = async () => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            console.log("AsyncStorage -> ", value);
            return JSON.parse(value)
        }
    } catch (error) {
        console.error(error)
    }
};

export const clearWishList = async () => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    } catch (exception) {
        return false;
    }
}
