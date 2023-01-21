import jwtDecode from 'jwt-decode';
import {useState} from 'react';
import React from 'react';
import {TextInput} from 'react-native';
import {propsComponent} from '../../config/types';
import {getValue} from '../../services/Storage/LocalStorage';
import styles from '../../config/style';

const WeatherstackPrecip: React.FC<propsComponent> = ({
  uuid,
  id,
  savedValue,
  newComponent,
  setArgs,
}) => {
  const [location, setLocation] = useState('');

  return (
    <>
      <TextInput
        placeholder="City"
        defaultValue={savedValue[0] || ''}
        onChangeText={async e => {
          setLocation(e);
          const decoded: any = jwtDecode(await getValue('token'));
          setArgs([e, decoded.uuid]);
        }}
        style={styles.inputTmp}
      />
    </>
  );
};

export default WeatherstackPrecip;
