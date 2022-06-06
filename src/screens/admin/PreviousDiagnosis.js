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

function PreviousDiagnosis({ navigation, route }) {

  return (
    <SafeAreaView style={styles.main}>
      <HeaderLite
        title={'Previous Diagnosis'}
        onPress={() => navigation.goBack()}
      // description={classInfo.classDescription}
      />
      {/* <View style={styles.searchContainer}>
        <Input height={hp(48)} placeholder={'Search the list'} />
      </View> */}
      <ScrollView style={styles.content}>
        <Userlist
          // key={item.id}
          onPress={() => navigation.navigate('Profile')}
          // image={{ uri: item.image }}
          name={'Car start problem'}
          description={'Recomendation: Charge battery'} />
      </ScrollView>
      {/* <View style={styles.buttonContainer}>
        <Button dark title={'Add student to ' + classInfo.className} onPress={() => setAddStudentModal(true)} />
      </View>
      <AddStudentModal
        isVisible={addStudentModal}
        onPressCancel={() => setAddStudentModal(false)}
        className={classInfo.name}
        studentNumber={classInfo.numberStudents}
        studentClass={classInfo.className} /> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // marginHorizontal: wp(20),
  },
  searchContainer: {
    marginTop: hp(20),
    marginHorizontal: wp(20),
  },
  content: {
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

export default PreviousDiagnosis;