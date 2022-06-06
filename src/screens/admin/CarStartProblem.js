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
import { carStartProblemQuestion, diagnosis } from '../../constants/constants';
import ActionCards from './components/ActionCards';
import Modal from "react-native-modal";

function CarStartProblem({ navigation }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [reRender, setReRender] = useState(0);
  const [answers, setAnswer] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  const prevQuestion = () => {
    if (questionIndex === 0) {
      return
    }

    setQuestionIndex(questionIndex - 1);
  }

  const nextQuestion = () => {
    if (questionIndex === carStartProblemQuestion.length - 1) {
      return
    }
    setQuestionIndex(questionIndex + 1);
  }

  const handleSubmit = () => {
    setOpenModal(true);
  }

  const modalClose = () => {
    setOpenModal(false);
    navigation.goBack()
  }

  const OptionComponent = ({ onPress, option, marginTop, selected }) => (
    <TouchableOpacity onPress={onPress}>
      <View style={{
        justifyContent: 'center',
        width: '100%',
        marginTop,
        height: hp(60),
        borderRadius: wp(10),
        borderLeftWidth: wp(10),
        borderLeftColor: selected ? colors.primary + 'cc' : colors.primary,
        backgroundColor: selected ? colors.primary + 'cc' : colors.primary + '20',
      }}>
        <Text style={{
          fontSize: wp(16),
          color: selected ? colors.white : colors.primary,
          marginLeft: wp(15)
        }}>{option}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.main}>
      <View style={styles.controlContainer}>
        <TouchableOpacity onPress={prevQuestion}>
          <Ionicons name={'chevron-back'} size={wp(30)} color={colors.primary} />
        </TouchableOpacity>
        <Text style={{ fontSize: wp(18) }}>{questionIndex + 1}/{carStartProblemQuestion.length}</Text>
        <TouchableOpacity
          onPress={questionIndex === carStartProblemQuestion.length - 1 ?
            handleSubmit : nextQuestion}>
          <Ionicons name={questionIndex === carStartProblemQuestion.length - 1 ?
            'checkmark-circle-outline' :
            'chevron-forward'} size={wp(30)} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{carStartProblemQuestion[questionIndex].question}</Text>
      </View>
      <View style={styles.answerContainer} key={answers.toString()}>
        {carStartProblemQuestion[questionIndex].options.map((item, index) => (
          <OptionComponent
            option={item.option}
            key={reRender + index}
            marginTop={index !== 0 ? hp(15) : 0}
            onPress={() => {
              let selectedOptions = answers;
              selectedOptions[questionIndex] = item.value;
              setAnswer(selectedOptions);
              setReRender(Math.random())
            }}
            selected={answers[questionIndex] === item.value}
          />
        ))}
      </View>
      <Modal
        isVisible={openModal}
        coverScreen={false}
        hasBackdrop={true}
        backdropOpacity={0.5}
        swipeDirection={'down'}
        onSwipeComplete={modalClose}
        onBackdropPress={modalClose}
        animationIn="slideInUp"
        style={{
          // width: '100%',
          // bottom: 0,
          margin: 0,
          height: '100%',
          alignItems: 'center',
          // justifyContent: 'flex-end',
          // backgroundColor: colors.mainBg,

        }}>
        <View style={modalStyles.main}>
          <View style={{ marginTop: hp(20), alignItems: 'center', paddingHorizontal: wp(20) }}>
            <View style={{ width: wp(120), height: hp(4), backgroundColor: '#eee', borderRadius: 999 }} />
          </View>
          <View style={modalStyles.header}>
            <View style={{ marginTop: hp(25) }}>
              {/* <Text style={modalStyles.title}>Conclussion</Text> */}
            </View>
          </View>
          <ScrollView style={{ flex: 1 }}>
            <View style={{ marginTop: hp(10) }}>
              <View style={modalStyles.content}>
                <Ionicons name={'checkmark-circle-outline'} color={colors.primary} size={wp(190)} />
                <Text style={modalStyles.title}>Diagonosis done</Text>
                <Text style={modalStyles.title}>Issue found: Dead Battery</Text>
                <Text style={modalStyles.title}>Recomemdation: Charge Battery</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // paddingHorizontal: -wp(20),
    // marginHorizontal: -wp(20),
  },
  controlContainer: {
    // width: '100%',
    marginHorizontal: wp(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  questionContainer: {
    flex: 0.5,
    // alignItems: 'center',
    paddingHorizontal: wp(20),
  },
  questionText: {
    paddingTop: hp(55),
    fontSize: wp(40),
    fontWeight: '700',
  },
  answerContainer: {
    flex: 0.5,
    backgroundColor: colors.primary + '30',
    paddingHorizontal: wp(20),
    paddingVertical: wp(20),
  },
  buttonContainer: {
    // position: 'absolute',
    paddingHorizontal: wp(20),
    paddingTop: hp(10),
    marginBottom: hp(25),
  },
})

const modalStyles = StyleSheet.create({
  main: {
    height: hp(450),
    width: hp(350),
    backgroundColor: '#ffffff',
    borderRadius: wp(10),
    // borderTopRightRadius: wp(10),
    // borderTopLeftRadius: wp(10),
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

export default CarStartProblem;