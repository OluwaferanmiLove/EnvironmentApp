import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../constants/colors';
import { hp, wp } from '../util/dimension';

function Button({
  title,
  marginTop,
  dark,
  loading = false,
  outlined = false,
  onPress,
  style,
  width = wp(200),
  height = hp(60),
  borderRadius = wp(22),
  fontSize = wp(18),
  fontWeight = 'bold',
  disabled,
}) {
  const backgroundColor = outlined ? '#ffffff00' : disabled ? colors.grey : dark ? colors.secondary : colors.primary;
  const titleColor = outlined ? colors.primary :  disabled ? colors.secondary : dark ? colors.white : colors.secondary;
  const borderWidth = outlined ? wp(1) : 0;

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled ? disabled : loading} style={{marginTop}}>
      <View style={[styles.main, { backgroundColor, borderWidth, width, height, borderRadius }, style]}>
        {loading ? (
          <ActivityIndicator size={'small'} color={titleColor} />
        ) : (
          <Text style={[styles.title, { color: titleColor, fontWeight, fontSize }]}>
            {title}
          </Text>  
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.secondary,
  },
  title: {
    fontWeight: '700',
    fontSize: wp(25),
  }
})

export default React.memo(Button);
