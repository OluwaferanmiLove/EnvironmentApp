import React, { useState, useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Modal from "react-native-modal";
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { colors } from '../../../constants/colors';
import { hp, wp } from '../../../util/dimension';
import { useToast } from 'react-native-toast-notifications';
import DropDownPicker from 'react-native-dropdown-picker';
import { makeid } from '../../../util/util';

function AddNewSubjectModal({ isVisible, onPressCancel, className, navigation }) {
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [teachers, setTeachers] = useState([]);

  const db = getFirestore();

  const adminsRef = query(collection(db, "users"), where("role", "==", 'teacher'));

  useEffect(() => {
    const getTeacher = async () => {
      let teacher = await getDocs(adminsRef);
      // let allAdmins = teacher.docs.map((item) => {
      //   return item.data();
      // })
      let allAdmins = teacher.docs.map((item) => {
        return {value: item.data(), label: item.data().firstName + ' ' + item.data().lastName};
      })

      setTeachers(allAdmins);
      console.log(allAdmins);
    }
  
    getTeacher();
  }, []);

  const config = {
    apiKey: "AIzaSyCiTfB6K6oAn8voEsnQk5bZBVe9ttcES_w",
    authDomain: "auhighschool-70d8b.firebaseapp.com",
    projectId: "auhighschool-70d8b",
    storageBucket: "auhighschool-70d8b.appspot.com",
    messagingSenderId: "850660120353",
    appId: "1:850660120353:web:73aebce9631c7863481060"
  };

  let secondaryApp;
  let auth;

  try {
    const SecondaryApp = getApp('Secondary');
    if (SecondaryApp) {
      auth = getAuth(SecondaryApp);
    }
  } catch (error) {
    secondaryApp = initializeApp(config, "Secondary");
    auth = getAuth(secondaryApp);
  }

  const userRef = collection(db, 'users')

  const toast = useToast()

  const handleAddData = async () => {
    // dispatch(login({role: 'student'}))
    try {
      setLoading(true);

      if (subject === null) {
        toast.show('Please review your input, all field must be filed');
        setLoading(false);
        return;
      }

      console.log(value)

      let data = {
        subject,
        class: className,
        teacherEmail: value.email,
        teacherFirstName: value.firstName,
        teacherLastname: value.lastName,
      }

      console.log(data);

      const subjectsRef = doc(db, 'subjects', makeid(16));

      // set user data in firestore
      let userInfo = await setDoc(subjectsRef, data);
      toast.show('Subject added successfull');
      setSubject(null);
      setValue(null);
      setLoading(false);
      onPressCancel();
      navigation.goBack();
    } catch (e) {
      toast.show(e.message)
      console.log(e.message)
      setLoading(false)
    }
  }

  return (
    <Modal
      isVisible={isVisible}
      coverScreen={false}
      hasBackdrop={true}
      backdropOpacity={0.5}
      swipeDirection={'down'}
      onSwipeComplete={onPressCancel}
      onBackdropPress={onPressCancel}
      animationIn="slideInUp"
      style={{
        // width: '100%',
        // bottom: 0,
        margin: 0,
        height: '100%',
        justifyContent: 'flex-end',
        // backgroundColor: colors.mainBg,

      }}>
      <View style={styles.main}>
        <View style={{ marginTop: hp(20), alignItems: 'center', paddingHorizontal: wp(20) }}>
          <View style={{ width: wp(120), height: hp(4), backgroundColor: '#eee', borderRadius: 999 }} />
        </View>
        <View style={styles.header}>
          <View style={{ marginTop: hp(25) }}>
            <Text style={styles.title}>Add new subject</Text>
          </View>
        </View>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ marginTop: hp(10) }}>
            <View style={styles.content}>
              {/* <View style={styles.imageContainer}>
                <Image source={{ uri: 'https://nwsid.net/wp-content/uploads/2015/05/dummy-profile-pic.png' }} style={styles.image} />
                <TouchableOpacity style={{
                  position: 'absolute',
                  backgroundColor: colors.primary + 30,
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Text style={{ fontSize: wp(14), color: colors.primary }}> + Add picture</Text>
                </TouchableOpacity>
              </View> */}
            </View>
            <View style={{ marginTop: hp(1) }}>
              <View style={styles.content}>
                <Input
                  label={'Subject name'}
                  placeholder={'Enter subject name'}
                  onChangeText={(text) => setSubject(text)}
                  value={subject}
                  marginTop={hp(15)}
                />
                <View style={{width: '100%', marginTop: hp(20), paddingHorizontal: wp(20)}}>
                  <View>
                    <Text style={styles.selectLabel}>Select Teacher</Text>
                  </View>
                  <View style={{width: '100%', marginTop: hp(20)}}>
                    <DropDownPicker
                      open={open}
                      value={value}
                      items={teachers}
                      style={{
                        backgroundColor: colors.inputBg + 'aa',
                        borderWidth: 0,
                        height: hp(55),
                      }}
                      listItemContainerStyle={{
                        backgroundColor: colors.inputBg + 'aa',
                        borderWidth: 0,
                      }}
                      setOpen={setOpen}
                      setValue={setValue}
                      setItems={setSubject}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={[styles.content, { marginTop: hp(35), paddingBottom: hp(30) }]}>
              <Button
                dark
                loading={loading}
                onPress={handleAddData}
                title={'Add Subject'} />
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  main: {
    height: hp(420),
    backgroundColor: '#ffffff',
    borderTopRightRadius: wp(10),
    borderTopLeftRadius: wp(10),
  },
  header: {
    // flexDirection: 'row',
    alignItems: 'center',
    width: wp(375),
  },
  backBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: wp(45),
    width: wp(45),
    borderRadius: 9999,
    backgroundColor: colors.secondary
  },
  title: {
    fontSize: hp(20),
    textAlign: 'center',
    color: colors.primary,
    fontWeight: '700',
  },
  description: {
    // fontFamily: 'ApparelDisplayBold',
    fontSize: hp(16),
    color: colors.secondaryDarker,
    marginTop: hp(4)
  },
  content: {
    alignItems: 'center',
    // marginTop: hp(20)
    // marginHorizontal: wp(20),
  },
  selectLabel: {
    fontSize: wp(18),
    fontWeight: 'bold',
    color: colors.primary,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    height: wp(130),
    width: wp(130),
    borderRadius: 9999,
    backgroundColor: colors.primary + 20,
  },
  image: {
    height: wp(130),
    width: wp(130),
    borderRadius: 9999,
    resizeMode: 'cover',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: hp(5)
  },
})

export default AddNewSubjectModal;