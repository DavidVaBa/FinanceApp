/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, TouchableHighlight, Modal, Button} from 'react-native';

export default class App extends Component {
  state = {
    accountsTotal: 0,
    actualDate: {
      actualYear: 0,
      actualMonth: 0,
      actualWeek: 0
    },
    visibleNewAccountModal: false
  }

  setDate = () => {
    const actualDate = new Date();
    let actualWeek;

    if (actualDate.getDate() <= 7) {
      actualWeek = 1;
    } else if (actualDate.getDate() <= 14) {
      actualWeek = 2;
    } else if (actualDate.getDate() <= 21) {
      actualWeek = 3;
    } else if (actualDate.getDate() <= 28) {
      actualWeek = 4;
    } else {
      actualWeek = 5;
    }

    this.setState(prevState => {
      return {
        ...prevState,
        actualDate: {
          actualYear: actualDate.getFullYear(),
          actualMonth: actualDate.getMonth() + 1,
          actualWeek: actualWeek
        }
      };
    });
  }

  getData = () => {
  }

  addAccount = (name, startAmount) => {
    const newAccount = {
      name: name,
      amount: startAmount
    }

    fetch("https://financeapp-c26ee.firebaseio.com/accounts.json", {
      method: "POST",
      body: JSON.stringify(newAccount)
    })
    .catch(err => console.log(err))
    .then(res => res.json())
    .then(parsedRes => {
      console.log(parsedRes);
    })
  }

  componentDidMount() {
    this.getData();
    this.setDate();
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Text style={styles.accountTotal}>Total money: {this.state.accountsTotal}</Text>
          </View>
          <TouchableHighlight>
            <Text onPress={()=> {
              this.setState(prevState => {
                return {
                  ...prevState,
                  visibleNewAccountModal: true
                }
              })
            }}>Add a new account</Text>
          </TouchableHighlight>
        </ScrollView>
        <Modal animationType="fade" transparent={true} visible={this.state.visibleNewAccountModal}>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <View>
              <Text>New account:</Text>
              <Button
                onPress={()=> {
                  this.setState(prevState => {
                    return {
                      ...prevState,
                      visibleNewAccountModal: false
                    }
                  })
                }} title="Add account" />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  accountTotal: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
