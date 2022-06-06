import React from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../constants/colors';
import { hp, wp } from '../util/dimension';
import { generateColor } from '../util/randomColor';
import ImageView from './ImageView';
import Ionicons from '@expo/vector-icons/Ionicons';
import { generateHumanReadableDate } from '../util/util';

function WeatherCard({ marginTop, marginLeft, onPress, image, time, temp, backgroundColor, width = wp(160)}) {
  let date = new Date(time * 1000);
  let timeGotten = date.toLocaleString();

  return (
    <TouchableOpacity onPress={onPress} style={{marginTop, marginLeft}}>
      {/* <View style={styles.weather}> */}
          <View style={[styles.weatherInfo, {backgroundColor}]}>
            <Image source={image} style={styles.image} />
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.degInfo}>
                {date.getHours()} : {date.getMinutes()}0
                {/* {timeGotten.toLocaleString("en-US", {hour: "numeric"})} */}
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.degText}>{parseInt(temp)}</Text>
                <Text style={styles.degSymbol}>°c</Text>
              </View>
              {/* <Text style={styles.degText}>31</Text> */}
            </View>
          </View>
        {/* </View> */}
    </TouchableOpacity>
  );
}

export const styles = StyleSheet.create({
  weather: {
    marginTop: hp(25),

  },
  weatherInfo: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(12),
    paddingHorizontal: hp(12),
    width: wp(130),
    backgroundColor: colors.secondary,
    borderRadius: wp(12)
  },
  image: {
    // flex: 1,
    width: wp(55),
    height: wp(55),
    resizeMode: 'contain',
    // backgroundColor: 'red'
  },
  degSymbol: {
    // flex: 1,
    fontSize: wp(18),
    fontWeight: 'bold',
    color: colors.white + 80,
    // backgroundColor: 'red',
  },
  degText: {
    // flex: 1,
    fontSize: wp(22),
    marginTop: hp(10),
    fontWeight: 'bold',
    color: colors.white,
    // backgroundColor: 'red',
  },
  degInfo: {
    // flex: 1,
    fontSize: wp(14),
    color: colors.white,
    // backgroundColor: 'red',
  },




  actionCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // width: wp(160),
    paddingVertical: hp(16),
    borderRadius: wp(8)
  },
  name: {
    fontSize: hp(18),
    fontWeight: '600',
  },
  description: {
    // fontFamily: 'ApparelDisplayBold',
    fontSize: hp(16),
    color: colors.primaryLighter,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(35),
    height: wp(35),
    borderRadius: 7,
    backgroundColor: colors.primary + '30',
  },
})

export default WeatherCard;