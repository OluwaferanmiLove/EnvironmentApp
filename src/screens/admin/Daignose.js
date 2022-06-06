import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { hp, wp } from '../../util/dimension';
import { colors } from '../../constants/colors';
import Input from '../../components/Input';
import HeaderLite from '../../components/HeaderLite';
import Userlist from '../../components/Userlist';
import { users } from '../../constants/mockData';
import Button from '../../components/Button';
import AddAdminModal from './components/AddAdminModal';
import { useToast } from 'react-native-toast-notifications';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import AddStudentModal from './components/AddStudentModal';
import { diagnosis } from '../../constants/constants';
import ActionCards from './components/ActionCards';
import CarStartProblem from './CarStartProblem';

function Daignose({ navigation, route }) {
  // const [addStudentModal, setAddStudentModal] = useState(false);
  // const [student, setStudents] = useState([]);
  const [problem, setProblem] = useState(null);

  return (
    <SafeAreaView style={styles.main}>
      {problem === null && (
      <HeaderLite
        title={'Diagnose'}
        onPress={() => navigation.goBack()}
        description={'Diagnose your car'}
      />)}
      {/* <View style={styles.searchContainer}>
        <Input height={hp(48)} placeholder={'Search the list'} />
      </View> */}
      {problem === null && (
        <ScrollView style={styles.content}>
          {diagnosis.map((item, index) => (
            <ActionCards
              marginTop={hp(15)}
              onPress={() => setProblem(item.name)}
              title={'New Diagonosis for problem:'}
              value={item.title}
              iconName={'settings-outline'} />
          ))}
        </ScrollView>
      )}
      {problem === 'carStartProblem' && (
        <CarStartProblem navigation={navigation} />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    display: 'flex',
    // marginHorizontal: wp(20),
  },
  searchContainer: {
    marginTop: hp(20),
    marginHorizontal: wp(20),
  },
  content: {
    flex: 1,
    marginTop: hp(20),
    paddingHorizontal: wp(20),
  },
  buttonContainer: {
    // position: 'absolute',
    paddingHorizontal: wp(20),
    paddingTop: hp(10),
    marginBottom: hp(25),
  },
})

export default Daignose;