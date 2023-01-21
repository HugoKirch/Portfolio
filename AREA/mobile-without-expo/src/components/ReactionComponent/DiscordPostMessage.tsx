import jwtDecode from 'jwt-decode';
import {useState} from 'react';
import React from 'react';
import {TextInput} from 'react-native';
import {propsComponent} from '../../config/types';
import {getValue} from '../../services/Storage/LocalStorage';

const DiscordPostMessage: React.FC<propsComponent> = ({
  uuid,
  id,
  savedValue,
  newComponent,
  setArgs,
}) => {
  const [username, setUsername] = useState('');
  const [body, setBody] = useState('');
  const [token, setToken] = useState('');

  return (
    <>
      <TextInput
        placeholder="Username"
        defaultValue={savedValue[0] || ''}
        onChangeText={async e => {
          setUsername(e);
          const decoded: any = jwtDecode(await getValue('token'));
          setArgs([e, body, token, decoded.uuid]);
        }}
      />
      <TextInput
        placeholder="Message content"
        defaultValue={savedValue[1] || ''}
        onChangeText={async e => {
          setBody(e);
          const decoded: any = jwtDecode(await getValue('token'));
          setArgs([username, e, token, decoded.uuid]);
        }}
      />
      <TextInput
        placeholder="Bot URL"
        defaultValue={savedValue[2] || ''}
        onChangeText={async e => {
          setToken(e);
          const decoded: any = jwtDecode(await getValue('token'));
          setArgs([username, body, e, decoded.uuid]);
        }}
      />
    </>
  );
};

export default DiscordPostMessage;
