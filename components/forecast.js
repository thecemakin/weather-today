import React from "react";
import { View,Text,StyleSheet } from "react-native";
import dayjs from "dayjs";
 
export default function ForecastItem({forecast}) {
  return (
    <View style={styles.container}>
      <Text style={styles.temp}>{Math.round(forecast.main.temp)}°</Text>
      <Text style={styles.dt}>{dayjs(forecast.dt * 1000).format('dddd ha')}</Text>
    </View>
  );

}

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'ghostwhite',
    padding: 10,
    aspectRatio: 9/16,
    borderRadius: 10,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(248, 248, 255, 0.47)'
  },
  temp:{
    fontFamily: 'InterBolt',
    fontSize: 45,
    color: 'black'
  },
  dt:{
    fontFamily: 'Inter',
    color: 'rgb(78, 72, 72)',
    fontSize: 20
  }
})
