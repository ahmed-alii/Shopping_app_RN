import React, {useContext, useEffect, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native'
import UserContext from "../WebServices/userContext";
import {clearWishList, getWishlist} from "../WebServices/wishlistStorage";
import {Button} from "react-native-elements";
import ListItems from "../components/ListItems";

export default function WishListScreen({navigation}) {
  const [Loading, setLoading] = useState(true)
  const [gifts, setGifts] = useState(undefined)
  const [refreshing, setRefreshing] = useState(false);
  const {loggedIn, setLoggedin} = useContext(UserContext)


  useEffect(() => {
    if (Loading === true) {
      getWishlist().then(r => setGifts(r))
      setLoading(false)
      setRefreshing(false)
    }
  })

  const onRefresh = () => {
    getWishlist().then(r => setGifts(r))
    setLoading(false)
    setRefreshing(false)

  }


  return (
      <UserContext.Consumer>
        {({loggedIn, setLoggedin}) => {
          return (
              <View style={styles.container}>
                <ScrollView style={styles.container}
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>

                  {!gifts && <Text
                      style={{textAlign: "center", fontSize: 20, fontWeight: "200", fontStyle: "italic", padding: 20}}>Wishlist
                    is empty</Text>}
                  {gifts && gifts.map((value, key) => {
                    return (
                        <ListItems gifts={value} navigation={navigation}/>
                    )
                  })}


                  {gifts && <Button style={{padding: 20}} title={"Clear Wish List"} onPress={() => {
                    clearWishList().then(r => {
                      alert("Wishlist cleared")
                      setLoading(true)
                    })
                  }}/>}

                </ScrollView>
              </View>
          )
        }}
      </UserContext.Consumer>


  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
  },
  smallText: {
    fontSize: 15,
    fontStyle: "italic",
    fontWeight: "200",
    color: "grey"
  },
  title: {
    fontSize: 30,
    fontWeight: "bold"
  }
});
