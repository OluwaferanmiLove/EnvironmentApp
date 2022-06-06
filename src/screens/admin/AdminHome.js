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
import moment from 'moment';

function AdminHome({ navigation }) {
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    const getWeatherData = () => {
      let data = {
        latitude: 7.376736,
        longitude: 3.939786,
      }
      apiService.getWeatherFullData(data)
        .then(res => {
          console.log(res.data);
          // setWeatherData(mockResponse);
          setWeatherData(res.data);
          setLoading(false)
        })
        .catch(error => {
          console.log(error);
        })
    }

    getWeatherData();
    // const dataInterval = setInterval(getWeatherData, 5000);

    // return () => clearInterval(dataInterval);
  }, [])

  const handleLogOut = () => {
    deleteFromStorage('userData')
      .then((response) => {
        dispatch(logout())
        // dispatch(resetState());
      })
  }

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.mainBg} />
      {!loading && (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={styles.infoContainer}>
            <Text style={styles.location}>
              Ede, Osun State
              {/* {weatherData.timezone} */}
            </Text>
            <Text style={styles.infoTitle}>
              {moment().format('ddd, D MMM')}
            </Text>
          </View>
          <View style={styles.weather}>
            <View style={styles.weatherInfo}>
              <Image
                // source={require('../../assets/rainy.png')}
                source={{ uri: getIconUrl(weatherData.current.weather[0].icon) }}
                style={styles.image} />
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                  <Text style={styles.degText}>{parseInt(weatherData.current.temp)}</Text>
                  <Text style={styles.degSymbol}>°c</Text>
                </View>
                <Text style={styles.degInfo}>{weatherData.current.weather[0].main}</Text>
                <Text style={[styles.degInfo, {fontSize: wp(14), fontWeight: '500'}]}>{weatherData.current.weather[0].description}</Text>
              </View>
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
          </View>
          <View style={styles.history}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: wp(16), fontWeight: 'bold', color: colors.white }}>Today</Text>
              <TouchableOpacity onPress={() => navigation.navigate('NextSevenDays', weatherData)}>
                <Text style={{ fontSize: wp(16), fontWeight: 'bold', color: colors.secondary }}>Next 7 days {'>'}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: hp(25) }}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {weatherData.hourly.slice(0,9).map((item, index) => (
                  <WeatherCard
                    image={{uri: getIconUrl(item.weather[0].icon)}}
                    backgroundColor={colors.secondary + index + 0}
                    time={item.dt}
                    temp={item.temp}
                    marginLeft={wp(15)} />
                ))}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      )}
      {loading && (
        <ActivityIndicator size={'small'} color={colors.white} />
      )}
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
    // flex: 1,
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
    paddingHorizontal: wp(25),
    width: '100%',
    height: hp(90),
    marginTop: hp(40),
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
})

export default AdminHome;