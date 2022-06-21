/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

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

import Realm from 'realm';

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

// const realm = await Realm.open({
//   path: 'RealmDemo',
//   schema: [Contact],
// });

const realm = new Realm({schema: [Customer]});

const customersDB = realm.objects('Customer');

const saveCustomer = () => {
  realm.write(() => {
    realm.create(
      'Customer',
      {
        id: '8',
        name: 'Grey',
        status: 'Active',
      },
      Realm.UpdateMode.Modified,
    );
  });
};

const updateCustomer = () => {
  const searchId = '1';

  const matchedCustomers = customersDB.filtered(`id == '${searchId}'`);

  matchedCustomers.forEach(customer => {
    realm.write(() => {
      customer.name = 'Tobyy1';
    });
  });
};

const deleteCustomer = () => {
  const customersToDelete = customersDB.filtered("id == '2'");
  customersToDelete.forEach(customer => {
    realm.write(() => {
      realm.delete(customer);
    });
  });
};

const App = () => {
  const [customers, setCustomers] = useState([]);
  // const setCustomersRef = useRef(setCustomers);

  const getAllCustomers = () => {
    setCustomers(customersDB);
  };

  const customerListener = (customers, changes) => {
    console.log('customerListener Started');
    try {
      // Update UI in response to deleted objects
      changes.deletions.forEach(index => {
        // Deleted objects cannot be accessed directly,
        // but we can update a UI list, etc. knowing the index.
        console.log(`A Customer was deleted at the ${index} index`);
      });
      // Update UI in response to inserted objects
      changes.insertions.forEach(index => {
        let insertedCustomer = customersDB[index];
        console.log(
          `insertedCustomer: ${JSON.stringify(insertedCustomer, null, 2)}`,
        );
      });
      // Update UI in response to modified objects
      // `newModifications` contains object indexes from after they were modified
      changes.newModifications.forEach(index => {
        let modifiedCustomer = customersDB[index];
        console.log(
          `modifiedCustomer: ${JSON.stringify(modifiedCustomer, null, 2)}`,
        );
        // ...
      });
      setCustomers(customersDB);
    } catch (err) {
      consolelog(err);
    }
  };

  useEffect(() => {
    customersDB.addListener(customerListener);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <View>
        <Text>Hi there</Text>
        <Button title="Save Customer" onPress={saveCustomer} />
        <Button title="Read All Customers" onPress={getAllCustomers} />
        <Button title="Update id=1 Customer" onPress={updateCustomer} />
        {customers.map(customer => {
          console.log(customer);
          return (
            <View key={customer.id}>
              <Text>Name: {customer.name}</Text>
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
