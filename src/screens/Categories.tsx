import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import CategoryItem from '../comps/CategoryItem'

const Categories = ({data,navigation}) => {


    if (data && data.length) {
        return (
            <View  style={{marginTop:20}}>
                <FlatList data={data}
                    keyExtractor={(item, index) => 'key' + index}
                    scrollEnabled
                    snapToAlignment="center"
                    scrollEventThrottle={16}
                    decelerationRate={"fast"}
                    numColumns={2}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return <CategoryItem item={item}  navigation={navigation}/>
                    }}
                />

         
            </View>
        )
    }

    return null
}

const styles = StyleSheet.create({
   
})

export default Categories