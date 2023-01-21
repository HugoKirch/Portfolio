import jwtDecode from 'jwt-decode';
import {useState} from 'react';
import React from 'react';
import {TextInput} from 'react-native';
import {propsComponent} from '../../config/types';
import {getValue} from '../../services/Storage/LocalStorage';
import styles from '../../config/style';

const WeatherstackWindspeed: React.FC<propsComponent> = ({
  uuid,
  id,
  savedValue,
  newComponent,
  setArgs,
}) => {
  const [location, setLocation] = useState('');
  const [windspeed, setWindspeed] = useState('');

  return (
    <>
      <TextInput
        placeholder="City"
        defaultValue={savedValue[0] || ''}
        onChangeText={async e => {
          setLocation(e);
          const decoded: any = jwtDecode(await getValue('token'));
          setArgs([e, windspeed, decoded.uuid]);
        }}
        style={styles.inputTmp}
      />
      <TextInput
        placeholder="Maximal wind speed"
        defaultValue={savedValue[1] || ''}
        onChangeText={async e => {
          setWindspeed(e);
          const decoded: any = jwtDecode(await getValue('token'));
          setArgs([location, e, decoded.uuid]);
        }}
        style={styles.inputTmp}
      />
    </>
  );
};

export default WeatherstackWindspeed;
