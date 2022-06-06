import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import { colors } from '../../constants/colors';
import { hp, wp } from '../../util/dimension';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AppContext } from '../../context/AppContext';
import ActionCards from './components/ActionCards';
import { generateColor } from '../../util/randomColor';
import ImageView from '../../components/ImageView';
import { deleteFromStorage } from '../../util/storageUtil';
import { logout } from '../../context/action';
import WeatherCard from '../../components/WeatherCard';
import { apiService } from '../../services/apiService';
import { generateHumanReadableDate, getIconUrl } from '../../util/util';
import { mockResponse } from '../../constants/constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HeaderLite from '../../components/HeaderLite';
import moment from "moment";

function NextSevenDays({ navigation, route }) {
  // const [weatherData, setWeatherData] = useState({});
  const { state, dispatch } = useContext(AppContext);

  const weatherData = route.params

  const handleLogOut = () => {
    deleteFromStorage('userData')
      .then((response) => {
        dispatch(logout())
        // dispatch(resetState());
      })
  }
  let date = new Date();

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.mainBg} />
      <HeaderLite title={'Next 7 Days'} onPress={() => navigation.goBack()} />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.weather}>
          <View>
            <Text style={{ fontSize: wp(16), fontWeight: 'bold', color: colors.white }}>
              Tomorrow
              <Text style={{ fontWeight: 'normal' }}> | {moment(weatherData.daily[1].dt * 1000).format("ddd, Do MMMM")}</Text></Text>
          </View>
          <View style={styles.weatherInfo}>
            <Image
              // source={require('../../assets/rainy.png')}
              source={{ uri: getIconUrl(weatherData.daily[1].weather[0].icon) }}
              style={styles.image} />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <Text style={styles.degText}>{parseInt(weatherData.daily[1].temp.max)}</Text>
                <Text style={styles.degSymbol}>°c</Text>
              </View>
              <Text style={styles.degInfo}>{weatherData.daily[1].weather[0].main}</Text>
              <Text style={[styles.degInfo, { fontSize: wp(14), fontWeight: '500' }]}>{weatherData.daily[1].weather[0].description}</Text>
            </View>
          </View>
          <View style={styles.otherInfo}>
            <View style={styles.info}>
              <Text style={styles.title}>Wind speed</Text>
              <Text style={styles.value}>{weatherData.daily[1]?.wind_speed} km/h</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.title}>Wind direction</Text>
              <Text style={styles.value}>{weatherData.daily[1]?.wind_deg}°</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.title}>Humidity</Text>
              <Text style={styles.value}>{weatherData.daily[1]?.humidity}%</Text>
            </View>
            {/* <View style={styles.info}>
              <Text style={styles.title}>Pressure</Text>
              <Text style={styles.value}>{weatherData.daily[1]?.pressure}</Text>
            </View> */}
          </View>
        </View>
        <View style={styles.history}>
          {/* <View style={{ marginTop: hp(25) }}> */}
            <ScrollView showsVerticalScrollIndicator={false}>
              {weatherData.daily.slice(2, 7).map((item, index) => (
                <View style={styles.weekWeather}>
                  <View style={{flex: 1}}>
                    <Text style={{ fontSize: wp(16), fontWeight: 'bold', color: colors.white }}>{moment(item.dt * 1000).format('ddd')}</Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={{ fontSize: wp(16), fontWeight: 'bold', color: colors.white }}>{parseInt(item.temp.max)}/{parseInt(item.temp.min)}°</Text>
                  </View>
                  <View style={{flexDirection: 'row', flex: 0.85, alignItems: 'center'}}>
                    <Image
                      // source={require('../../assets/rainy.png')}
                      source={{ uri: getIconUrl(item.weather[0].icon) }}
                      style={styles.weekImage} />
                      <Text style={{ fontSize: wp(16), fontWeight: 'bold', color: colors.white+80 }}>{item.weather[0].main}</Text>
                  </View>
                </View>
                // <WeatherCard
                //   image={{uri: getIconUrl(item.weather[0].icon)}}
                //   backgroundColor={colors.secondary + index + 0}
                //   time={item.dt}
                //   temp={item.temp}
                //   marginLeft={wp(15)} />
              ))}
            </ScrollView>
          </View>
        {/* </View> */}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginHorizontal: wp(20),
  },
  header: {
    marginTop: hp(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop: hp(20),
    // paddingVertical: hp(22),
    borderRadius: wp(10),
    // backgroundColor: colors.primary + '10',
  },
  infoTitle: {
    fontSize: wp(16),
    fontWeight: '300',
    color: colors.primary + 80,
    marginTop: hp(15)
  },
  location: {
    fontSize: wp(30),
    fontWeight: '700',
    marginTop: hp(10),
    color: colors.primary,
  },
  weather: {
    marginTop: hp(25),
    backgroundColor: colors.inputBg,
    paddingTop: hp(20),
    // paddingVertical: hp(60),
    paddingHorizontal: hp(20),
    borderRadius: wp(18)
  },
  weatherInfo: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // width: '100%',
    // backgroundColor: 'red'
  },
  image: {
    flex: 1,
    width: wp(200),
    height: wp(200),
    resizeMode: 'contain',
    // backgroundColor: 'red'
  },
  degText: {
    // flex: 1,
    fontSize: wp(80),
    fontWeight: 'bold',
    color: colors.white,
    // backgroundColor: 'red',
  },
  degSymbol: {
    // flex: 1,
    fontSize: wp(40),
    // fontWeight: 'bold',
    color: colors.white + 80,
    // backgroundColor: 'red',
  },
  degInfo: {
    // flex: 1,
    fontSize: wp(20),
    fontWeight: 'bold',
    color: colors.white,
    // backgroundColor: 'red',
  },
  otherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingHorizontal: wp(25),
    width: '100%',
    height: hp(90),
    // marginTop: hp(40),
    backgroundColor: colors.inputBg + 80,
    borderRadius: wp(15),
  },
  info: {
    alignItems: 'center',
  },
  title: {
    fontSize: wp(16),
    color: colors.white + 80,
  },
  value: {
    fontSize: wp(18),
    fontWeight: 'bold',
    color: colors.white,
    marginTop: hp(6)
  },
  history: {
    marginTop: hp(50),
  },
  weekWeather: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weekImage: {
    // flex: 1,
    width: wp(45),
    height: wp(45),
    resizeMode: 'contain',
    // backgroundColor: 'red'
  },
})

export default NextSevenDays;