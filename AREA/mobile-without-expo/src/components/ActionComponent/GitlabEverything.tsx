import jwtDecode from 'jwt-decode';
import {useEffect} from 'react';
import React from 'react';
import {Text} from 'react-native';
import {propsComponent} from '../../config/types';
import {getValue} from '../../services/Storage/LocalStorage';

const GitlabEverything: React.FC<propsComponent> = ({
  uuid,
  id,
  savedValue,
  newComponent,
  setArgs,
}) => {
  useEffect(() => {
    (async () => {
      const userToken = await getValue('token');
      const decoded: any = jwtDecode(userToken);
      setArgs([decoded.uuid]);
    })();
  }, [setArgs]);

  return (
    <>
      <Text>No information needed</Text>
    </>
  );
};

export default GitlabEverything;
