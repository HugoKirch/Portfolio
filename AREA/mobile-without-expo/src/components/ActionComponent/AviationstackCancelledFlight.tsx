import jwtDecode from 'jwt-decode';
import {useState} from 'react';
import React from 'react';
import {TextInput} from 'react-native';
import {propsComponent} from '../../config/types';
import {getValue} from '../../services/Storage/LocalStorage';
import styles from '../../config/style';

const AviationstackCancelledFlight: React.FC<propsComponent> = ({
  savedValue,
  setArgs,
}) => {
  const [flightNumber, setFlightNumber] = useState('');
  const [flightDate, setFlightDate] = useState('');

  return (
    <>
      <TextInput
        placeholder="Flight number"
        defaultValue={savedValue[0] || ''}
        onChangeText={async e => {
          setFlightNumber(e);
          const decoded: any = jwtDecode(await getValue('token'));
          setArgs([e, flightDate, decoded.uuid]);
        }}
        style={styles.inputTmp}
      />
      <TextInput
        placeholder="Flight date"
        defaultValue={savedValue[1] || ''}
        onChangeText={async e => {
          setFlightDate(e);
          const decoded: any = jwtDecode(await getValue('token'));
          setArgs([flightNumber, e, decoded.uuid]);
        }}
        style={styles.inputTmp}
      />
    </>
  );
};

export default AviationstackCancelledFlight;
