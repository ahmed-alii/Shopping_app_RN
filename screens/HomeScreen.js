import React, {useContext, useEffect, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native'
import {Button, Card} from "react-native-elements";
import UserContext from "../WebServices/userContext";
import {pets} from "../constants/pets";
import {Fetch} from "../WebServices/firebaseIO";

export default function HomeScreen({navigation}) {
  const [Loading, setLoading] = useState(true)
  const [status, setStatus] = useState(undefined)
  const [refreshing, setRefreshing] = useState(false);
  const {loggedIn, setLoggedin} = useContext(UserContext)


  //Fetch shop data and get it into the app from the API
  useEffect(() => {
    if (Loading === true) {
      Fetch.getData(loggedIn.city).then(res => {
        if(res.error){
          alert(res.error)
          setLoading(false)
          setRefreshing(false)
        }else{
          setStatus(res)
          setLoading(false)
          setRefreshing(false)
        }
      })
    }
  })

  //Fetch data again when pull to refresh.
  const onRefresh = () => {
    Fetch.getData(loggedIn.city).then(res => {
      if(res.error){
        alert(res.error)
        setLoading(false)
        setRefreshing(false)
      }else{
        setStatus(res)
        setLoading(false)
        setRefreshing(false)
      }
    })
    setRefreshing(true)
    setLoading(true)

  }


  return (
      <UserContext.Consumer>
        {({loggedIn, setLoggedin}) => (
            <View style={styles.container}>
              <ScrollView style={styles.container}
                          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>

                <Text style={{color: "gray", fontSize: 18, paddingHorizontal: 20, paddingVertical: 10}}>Shop is: <Text style={{color: "black", fontSize: 25, fontWeight: "bold", paddingHorizontal: 10}}>{status}</Text></Text>

                <Card title={"Cats"} image={require("../assets/images/cats.jpg")}>
                  <Button title={"Show Products"} onPress={() => {
                    navigation.navigate("Details", {pet: pets.cats})
                  }}/>
                </Card>
                <Card title={"Dogs"} image={require("../assets/images/dogs.jpg")}>
                  <Button title={"Show Products"} onPress={() => {
                    navigation.navigate("Details", {pet: pets.dogs})
                  }}/>
                </Card>
                <Card title={"Hens"} image={require("../assets/images/hens.jpg")}>
                  <Button title={"Show Products"} onPress={() => {
                    navigation.navigate("Details", {pet: pets.hens})
                  }}/>
                </Card>
                <Card title={"Fish"} image={require("../assets/images/fish.jpg")}>
                  <Button title={"Show Products"} onPress={() => {
                    navigation.navigate("Details", {pet: pets.fish})
                  }}/>
                </Card>

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
