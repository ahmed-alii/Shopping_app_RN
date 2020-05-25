import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native'
import UserContext from "../WebServices/userContext";
import {Button, Card, ListItem} from "react-native-elements";
import {Block} from "galio-framework";
import {getWishlist, saveWishlist} from "../WebServices/wishlistStorage";

export default function DetailsScreen({navigation, route}) {

    const [data, setData] = useState(undefined);
    const [Loading, setLoading] = useState(true)


    useEffect(() => {
        if (Loading === true) {
            setData(route.params.data)
        }
    })


    return (
        <UserContext.Consumer>
            {({loggedIn, setLoggedin}) => {
                if (data !== undefined) {
                    return (
                        <View style={styles.container}>
                            <ScrollView style={styles.container}>
                                <Card featuredTitle={data[0]} image={{uri: data[1].image}}
                                      featuredTitleStyle={{fontSize: 30}}>
                                    <Block row space={"around"}>
                                        <Button title="Add to wish list" onPress={()=> {
                                            let save = {[data[0]]: data[1]}
                                            console.log(save)
                                            saveWishlist(save).then(alert("Added to wishlist."))

                                        }}/>
                                        <Button title="Buy Now" onPress={() => (alert("Purchase Done."))}/>
                                    </Block>
                                </Card>
                                <Text style={{fontSize: 20, fontWeight: "bold", padding: 20}}>Description</Text>
                                <Text style={{paddingHorizontal: 20}}>Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Aut blanditiis eligendi
                                    iusto neque pariatur. Accusantium aliquid amet, at deserunt dolorum facere, facilis
                                    hic ipsam iure molestias perferendis praesentium, unde voluptatum.</Text>

                                <Text style={{textAlign: "center", paddingVertical: 10}}>...</Text>

                                <ListItem title={"Price"} rightSubtitle={data[1].price} bottomDivider
                                          titleStyle={{fontSize: 20}} rightSubtitleStyle={{fontSize: 18}}/>

                                <ListItem title={"Colour"} rightSubtitle={data[1].color} bottomDivider
                                          titleStyle={{fontSize: 20}} rightSubtitleStyle={{fontSize: 18}}/>
                                <ListItem title={"Weight"} rightSubtitle={"200 Grams"} bottomDivider
                                          titleStyle={{fontSize: 20}} rightSubtitleStyle={{fontSize: 18}}/>
                                <ListItem title={"Shipping Time"} rightSubtitle={data[1].shipping + " Days"}
                                          bottomDivider
                                          titleStyle={{fontSize: 20}} rightSubtitleStyle={{fontSize: 18}}/>
                            </ScrollView>
                        </View>
                    )
                } else {
                    return (
                        <View style={styles.container}>
                            <Text>No Data Found</Text>
                        </View>
                    )

                }
            }}
        </UserContext.Consumer>


    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom: 50
    },
    header: {
        padding: 20,
    },
    smallText: {
        fontSize: 15,
        fontStyle: "italic",
        fontWeight: "200",
        color: "grey"
    }
});
