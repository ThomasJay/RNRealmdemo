import {Realm, createRealmContext} from '@realm/react';

class Customer extends Realm.Object {}

Customer.schema = {
  name: 'Customer',
  properties: {
    id: 'string',
    name: 'string',
    status: 'string?',
  },
  primaryKey: 'id',
};

export default Customer;
