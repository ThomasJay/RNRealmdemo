import React, {useState, useEffect, useRef} from 'react';

import {
  SafeAreaView,
  Button,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import RootContext from './realm/RootContext';
import Customer from './realm/CustomerContext';
import Item from './realm/ItemContext';

const {useRealm, useQuery, useObject} = RootContext;

const App = () => {
  const realm = useRealm();
  const myCustomer = useObject(Customer, '1');
  //  const [customers, setCustomers] = useState([]);
  const customers = useQuery(Customer);
  const items = useQuery(Item);

  const addItem = () => {
    realm.write(() => {
      realm.create(
        'Item',
        {
          id: '1',
          name: 'Apple',
          status: 'Active',
        },
        Realm.UpdateMode.Modified,
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <View>
        <Text>Id: {myCustomer.id}</Text>
        <Text>Name: {myCustomer.name}</Text>
      </View>
      <View>
        <Text>Hi there2</Text>
        <Button title="Save Item" onPress={addItem} />
        <Button title="Read All Customers" />
        <Button title="Update id=1 Customer" />
        {customers.map(customer => {
          console.log(customer);
          return (
            <View key={customer.id}>
              <Text>Name: {customer.name}</Text>
            </View>
          );
        })}
        {items.map(item => {
          console.log(item);
          return (
            <View key={item.id}>
              <Text>Item Name: {item.name}</Text>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
