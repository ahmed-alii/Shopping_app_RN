import React, {useState} from 'react';
import {RefreshControl, SafeAreaView, ScrollView, StyleSheet} from 'react-native'
import UserContext from "../WebServices/userContext";
import {SearchBar} from "react-native-elements";
import {searchGifts} from "../constants/GIFTS";
import ListItems from "../components/ListItems";

export default function SearchScreen({navigation}) {
    const [search, setSearch] = useState("");
    const [Loading, setLoading] = useState(true)
    const [gifts, setGifts] = useState(undefined)
    const [refreshing, setRefreshing] = useState(false);

    let updateSearch = search => {
        setSearch(search);
    }

    const loadDataInView = () => {
        if (search !== "") {
            const stationCodes = searchGifts(search)
            setGifts(stationCodes)
            setLoading(false)
            setRefreshing(false)
        }
    }


    const onRefresh = () => {
        loadDataInView()
        setRefreshing(true)
        setLoading(true)

    }

    return (
        <UserContext.Consumer>
            {({loggedIn, setLoggedin}) => (
                <SafeAreaView style={styles.container}>
                    <SearchBar
                        platform="ios"
                        cancelButtonTitle="Cancel"
                        placeholder='Search Happy Counter Gifts Shop'
                        value={search}
                        onChangeText={updateSearch}
                        onSubmitEditing={loadDataInView}
                        containerStyle={{paddingVertical: 50, backgroundColor: "#fff"}}
                    />
                    <ScrollView style={styles.container}
                                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                        {gifts && <ListItems gifts={gifts} navigation={navigation}/>}
                    </ScrollView>
                </SafeAreaView>
            )}
        </UserContext.Consumer>
    )

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
