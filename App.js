import React, {useEffect, useState} from "react";
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TABBAR from './navigation/TABBAR';
import UserContext from "./WebServices/userContext";
import AuthenticationStack from "./navigation/AuthenticationStack";
import {getData} from "./WebServices/Storage";
import DetailsScreen from "./screens/DetailsScreen";

// creates stack for app
const Stack = createStackNavigator();

export default App = () => {
    console.disableYellowBox = true;
    const [loggedIn, setLoggedin] = useState(undefined);

    useEffect(() => {
        if (!loggedIn){
            getData().then(r => {
                console.log("Storage to state")
                setLoggedin(r)
            })
        }
    })


    const value = {loggedIn, setLoggedin};

    // if logged in, go to this stack
    if (loggedIn) {
        return (
            <UserContext.Provider value={value}>
                <UserContext.Consumer>
                    {({loggedIn, setLoggedin}) => (
                        <View style={styles.container}>
                            {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
                            <NavigationContainer>
                                <Stack.Navigator>
                                    <Stack.Screen name="Root" component={TABBAR}/>
                                    <Stack.Screen name="Details" component={DetailsScreen} />
                                </Stack.Navigator>
                            </NavigationContainer>
                        </View>
                    )}
                </UserContext.Consumer>
            </UserContext.Provider>
        );
    } else {
        // if not logged in, go to this stack
        return (
            <UserContext.Provider value={value}>
                <UserContext.Consumer>
                    {({loggedIn, setLoggedin}) => (
                        <View style={styles.container}>
                            {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
                            <NavigationContainer>
                                <AuthenticationStack/>
                            </NavigationContainer>
                        </View>
                    )}
                </UserContext.Consumer>
            </UserContext.Provider>

        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
