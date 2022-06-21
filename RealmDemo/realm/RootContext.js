import {Realm, createRealmContext} from '@realm/react';

import Customer from './CustomerContext';
import Item from './ItemContext';

const config = {
  schema: [Customer, Item],
};

const RootContext = createRealmContext(config);

export default RootContext;
