import jwtDecode from 'jwt-decode';
import {useState} from 'react';
import React from 'react';
import {TextInput} from 'react-native';
import {propsComponent} from '../../config/types';
import {getValue} from '../../services/Storage/LocalStorage';
import styles from '../../config/style';

const Mediastack: React.FC<propsComponent> = ({
  uuid,
  id,
  savedValue,
  newComponent,
  setArgs,
}) => {
  const [countries, setCountries] = useState('');
  const [sports, setSports] = useState('');

  return (
    <>
      <TextInput
        placeholder="Reference country"
        defaultValue={savedValue[0] || ''}
        onChangeText={async e => {
          setCountries(e);
          const decoded: any = jwtDecode(await getValue('token'));
          setArgs([e, sports, decoded.uuid]);
        }}
        style={styles.inputTmp}
      />
      <TextInput
        placeholder="Sport news"
        defaultValue={savedValue[1] || ''}
        onChangeText={async e => {
          setSports(e);
          const decoded: any = jwtDecode(await getValue('token'));
          setArgs([countries, e, decoded.uuid]);
        }}
        style={styles.inputTmp}
      />
    </>
  );
};

export default Mediastack;
