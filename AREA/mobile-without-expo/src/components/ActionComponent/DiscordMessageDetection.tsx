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
  const [token, setToken] = useState('');
  const [triggerWord, setTriggerWord] = useState('');

  return (
    <>
      <TextInput
        placeholder="Bot URL"
        defaultValue={savedValue[0] || ''}
        onChangeText={async e => {
          setToken(e);
          const decoded: any = jwtDecode(await getValue('token'));
          setArgs([e, triggerWord, decoded.uuid]);
        }}
        style={styles.inputTmp}
      />
      <TextInput
        placeholder="Word to trigger"
        defaultValue={savedValue[1] || ''}
        onChangeText={async e => {
          setTriggerWord(e);
          const decoded: any = jwtDecode(await getValue('token'));
          setArgs([token, e, decoded.uuid]);
        }}
        style={styles.inputTmp}
      />
    </>
  );
};

export default WeatherstackWindspeed;
