import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, Animated,TouchableOpacity } from 'react-native'
import CarouselItem from './CarouselItem'


const { width } = Dimensions.get('window')
let flatList1





const Carousel = ({ data }) => {

    function infiniteScroll(dataList) {
        const numberOfData = dataList.length
        var scrollValue = 0, scrolled = 0
    
        setInterval(function () {
            scrolled++
            if (scrolled < dataList.length) {
                scrollValue = scrollValue + width-40
            }
            else {
                scrollValue = 0
                scrolled = 0
            }
    
            if (flatList1 != undefined && flatList1 != null) {
                flatList1.scrollToOffset({ animated: true, offset: scrollValue })
            }
        }, 2000)
    }

    const scrollX = new Animated.Value(0)
    let position = Animated.divide(scrollX, width)
    const [dataList, setDataList] = useState(data)
    const [isStopScrolling, setIsStopScrolling] = useState(false)

    useEffect(() => {
        setDataList(data)
    },[])

    const BannerPressed=()=>{
      //  setIsStopScrolling(true)
    }


    if (dataList && dataList.length) {
        return (
            <View>
                <FlatList data={dataList}
                    ref={(flatList) => { flatList1 = flatList }}
                    keyExtractor={(item, index) => 'key' + index}
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    snapToAlignment="center"
                    scrollEventThrottle={16}
                    decelerationRate={"normal"}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return <View>
                        <TouchableOpacity onPress={()=>BannerPressed()}>
                         <CarouselItem item={item} />
                        </TouchableOpacity>
                        </View>
                    
                    }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false }
                    )}
                />

                <View style={styles.dotView}>
                    {dataList.map((_, i) => {
                        let opacity = position.interpolate({
                            inputRange: [i - 1, i, i + 1],
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: 'clamp'
                        })
                        return (
                            <Animated.View
                                key={i}
                                style={{ opacity, height: 10, width: 10, backgroundColor: '#595959', margin: 8, borderRadius: 5 }}
                            />
                        )
                    })}

                </View>
            </View>
        )
    }

    return null
}

const styles = StyleSheet.create({
    dotView: { 
    flexDirection: 'row', 
    justifyContent: 'center',
    marginTop:-40,
    marginLeft:10,
    marginRight:50,
    backgroundColor:'rgba(255,255,255,0.5)', }
})

export default Carousel