import React, {useState, useEffect, useRef} from 'react';

import {Realm, createRealmContext} from '@realm/react';

import App from './App';

import RootContext from './realm/RootContext';

const {RealmProvider} = RootContext;

const DBSetup = () => {
  return (
    <RealmProvider>
      <App />
    </RealmProvider>
  );
};

export default DBSetup;
