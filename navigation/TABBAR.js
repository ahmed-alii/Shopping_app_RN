import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from "../screens/SearchScreen";
import WishListScreen from "../screens/WishListScreen";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function TABBAR({navigation, route}) {

    navigation.setOptions({headerTitle: getHeaderTitle(route)});

    return (
        <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
            <BottomTab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'Home',
                    tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="md-gift"/>,
                }}
            />

            <BottomTab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    title: 'Search',
                    tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="md-search"/>,
                }}
            />

            <BottomTab.Screen
                name="Wish List"
                component={WishListScreen}
                options={{
                    title: 'Wish List',
                    tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="md-heart"/>,
                }}
            />

            <BottomTab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    title: 'Profile',
                    tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="md-settings"/>,
                }}
            />
        </BottomTab.Navigator>
    );
}

function getHeaderTitle(route) {
    const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
    switch (routeName) {
        case 'Home':
            return 'Happy Counter';
        case 'Profile':
            return 'Profile';
        case 'Search':
            return 'Search Gifts';
        case 'Wish List':
            return 'Wish List';
    }
}
