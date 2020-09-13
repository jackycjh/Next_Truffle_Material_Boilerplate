import React, { Component } from 'react';
import Head from 'next/head';

import getWeb3 from '../utils/getWeb3';
import truffleContract from "truffle-contract";
import SimpleStorageContract from "../contracts/SimpleStorage.json";

export default class Layout extends Component {
  state = {
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const Contract = truffleContract(SimpleStorageContract);
      Contract.setProvider(web3.currentProvider);
      // Uncomment the following line the get Contract.
      // const instance = await Contract.deployed();

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({
        web3,
        accounts,
        // Uncomment the following line the set Contract.
        // contract: instance
      });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  render() {
    return (
      <div>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

          <title>Next Truffle Material</title>
        </Head>

        {this.props.children}
      </div>
    );
  }

}
