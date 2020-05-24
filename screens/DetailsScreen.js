import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View, Image, Button} from 'react-native'
import UserContext from "../WebServices/userContext";
import {Card} from "react-native-elements";

export default function DetailsScreen({navigation, route}) {

    // Shows the products in each category. This has cards which shows price, stock, image and a buy button.

    const [data, setData] = useState(null);
    const [Loading, setLoading] = useState(true)


    useEffect(() => {
        if (Loading === true) {
            setData(route.params.pet)
        }
    })


    return (
        <UserContext.Consumer>
            {({loggedIn, setLoggedin}) => (
                <View style={styles.container}>
                    <ScrollView style={styles.container}>
                        {data && data.map((item, key) => (
                            <Card
                            featuredTitle={item.title}
                            key={key}
                            title={"Price: " + item.price + " - Stock: " + item.stock}
                            image={{uri: item.image}}>
                            <Button
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            title='Buy Now'  onPress={()=>(alert("You can purchase this item in our shop."))}/>
                            </Card>

                        ))}
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
    },
    title: {
        fontSize: 30,
        fontWeight: "bold"
    }
});
