import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const Splash = () => {
    const navigation=useNavigation()
    useEffect(()=>{
        setTimeout(()=>{
            navigation.navigate('allnote')
        },3000)
    },[])
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text style={{fontSize:20,color:'limegreen'}}>MY NOTEPAD</Text>
    </View>
  )
}

export default Splash