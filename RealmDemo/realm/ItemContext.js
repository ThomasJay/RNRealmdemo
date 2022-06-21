import {Realm, createRealmContext} from '@realm/react';

class Item extends Realm.Object {}

Item.schema = {
  name: 'Item',
  properties: {
    id: 'string',
    name: 'string',
    status: 'string?',
  },
  primaryKey: 'id',
};

export default Item;
