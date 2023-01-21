import {StyleSheet, ScrollView, Text, View} from 'react-native';
import React from 'react';
import AREACard from '../../components/AREACard/AREACard';

const CreateAREA = () => {
  return (
    <View style={styles.root}>
      <AREACard />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingTop: '5%',
    backgroundColor: '#E3F2FD',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});

export default CreateAREA;
