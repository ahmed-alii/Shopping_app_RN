import React, {useContext, useEffect, useState} from 'react';
import {FlatList, RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native'
import UserContext from "../WebServices/userContext";
import {GIFTS} from "../constants/GIFTS";
import {ListItem} from "react-native-elements";
import ListItems from "../components/ListItems";

export default function HomeScreen({navigation}) {
  const [Loading, setLoading] = useState(true)
  const [gifts, setGifts] = useState(undefined)
  const [refreshing, setRefreshing] = useState(false);
  const {loggedIn, setLoggedin} = useContext(UserContext)


  useEffect(() => {
    if (Loading === true) {
      setGifts(GIFTS)
      setLoading(false)
      setRefreshing(false)
    }
  })

  //Fetch data again when pull to refresh.
  const onRefresh = () => {
    setGifts(GIFTS)
    setLoading(false)
    setRefreshing(false)

  }


  return (
      <UserContext.Consumer>
        {({loggedIn, setLoggedin}) => (
            <View style={styles.container}>
              <ScrollView style={styles.container}
                          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                {gifts && <ListItems gifts={gifts} navigation={navigation}/>}
              </ScrollView>
            </View>
        )}
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
