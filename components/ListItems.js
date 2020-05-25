import {ListItem} from "react-native-elements";
import React from "react";

export default function ({gifts, navigation}) {
    return (
        Object.entries(gifts).map((value, key) => (
            <ListItem
                key={key}
                leftAvatar={{source: {uri: value[1].image}, size: "large"}}
                title={value[0]}
                subtitle={"Price: " + value[1].price + " £"}
                titleStyle={{fontWeight: "bold", fontSize: 20}}
                subtitleStyle={{color: "blue", fontSize: 16}}
                bottomDivider
                onPress={()=> navigation.navigate("Details", {data: value})}
            />
        ))
    )
}