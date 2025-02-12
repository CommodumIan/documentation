---
title: Withdraw assets
sidebar_position: 4
hide_title: false
description: How to withdraw assets from Vega back to an Ethereum wallet.
vega_network: TESTNET
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import NetworkParameter from '@site/src/components/NetworkParameter';
import EthAddresses from '@site/src/components/EthAddresses';

:::caution Completing a withdrawal
Before beginning a withdrawal, it is worth confirming that there's no scheduled network restart or upgrade in the following 48 hours.

* Withdrawals may be subject to a delay once started.
* Any withdrawals that are left 'in progress' during a network restart or upgrade will not be visible in any UI or API request. **Your assets will be safe** but you will need to get the details of your transaction. See the instructions below for how to do this.
:::

The easiest way to withdraw assets is to use the Console trading interface, which will walk you through the process and notify you of progress. However, if you'd like to interact directly with Etherscan instead, use the instructions below.

## What you need
You'll need the following information available:
* Vega public key you want to withdraw from
* Vega Wallet connection details (wallet name, passphrase)
* ERC-20 bridge logic address
* Vega asset ID
* Receiver Ethereum address for the withdrawal

### Bridge address 
The ERC-20 bridge address shown is for the Ethereum network that is compatible with the Vega network these docs are pointing to. 

<EthAddresses frontMatter={frontMatter} show={["ERC20Bridge"]} />

## Withdrawal delays and thresholds
Assets can have a withdrawal delay, as well as a withdrawal delay threshold. 

**Withdrawal delay**: Set on the ERC-20 bridge for all assets. It is the time that a withdrawal is delayed, once it's begun, before it can be completed. You can see the delay by looking at the ERC-20 bridge contract. 

**Withdrawal delay threshold**: Set per asset in its governance proposal. Requesting to withdraw that amount (and above) will trigger a withdrawal delay. If the threshold is 1, that denotes the smallest decimal position for the market's asset, and thus all withdrawals will have a delay. [Query for an asset's details](../../api/rest/data-v2/trading-data-service-get-asset.api.mdx) (under erc20) to see each asset's delay threshold.

If your withdrawal amount is higher than the withdrawal threshold, the multi-signature bundle will only be usable *after* the withdrawal delay has passed, after which the assets can be moved into an Ethereum wallet.

Once the delay time has passed, and if the bundle is valid, the withdrawal **must be completed by submitting the bundle** to Ethereum and paying the gas fee required. 

## Withdraw using Etherscan

### Prepare and send withdrawal transaction

You'll need to prepare a withdrawal transaction to send using your Vega Wallet app.

You can use the following transaction template (formatted for Linux/MacOS):

```bash
./vegawallet transaction send --wallet YOUR-WALLETNAME --pubkey YOUR-PUBLIC-KEY --network NETWORK-NAME '{
 "withdrawSubmission": {
  "amount": "FULL_AMOUNT_WITHOUT_DECIMAL_POINT",
  "asset": "ASSET_ID",
  "ext": {
   "erc20": {
    "receiverAddress": "RECEIVER_ETHEREUM_ADDRESS"
   }
  }
}
```

### Query for withdrawal ID

1. Query for your withdrawal ID, using the [list withdrawals API](../../api/rest/data-v2/trading-data-service-list-withdrawals.api.mdx). 

You could, instead, calculate it from the transaction signature by generating a sha3 hash in the format:

```
sha3_256(ethers.utils.arrayify('0x' + sig));
```

Once the withdrawal delay has passed, you can carry on with the following steps. 

### Retrieve signature bundle

2. Retrieve the signature bundle using the [get withdrawal API](../../api/rest/data-v2/trading-data-service-get-withdrawal.api.mdx). You'll need the withdrawal ID from the step above to do this.

### Run asset withdrawal 

3. Ensure the withdrawal bundle from Vega that you retrieved in the previous step is available. 

4. Go to `etherscan.io/address/[erc20_bridge_logic_address]` (see above)
* a. Click on `Contract`
* b. Click on `Write Contract`
* c. Click on `Connect to Web3` and follow instructions provided to connect to your Ethereum wallet
* d. Under `asset_source`, paste in the erc20_token_address
* e. For `amount`, put in the **exact** amount from the withdrawal bundle, including all decimal places
* f. For `target`, enter the Ethereum address the withdrawal order is for. It does not need to be the running address
* g. Under `creation`, insert the creation data assigned by Vega. It is available in the withdrawal bundle
* h. Under `nonce`, paste in the exact nonce number from the withdrawal bundle
* i. Under `signatures`, paste in the signature string from the withdrawal bundle. This will be very long
* j. Click `Write` and follow the wallet prompts, including paying Ethereum gas fees to complete the transaction.

✅ Your withdrawal is then complete and your assets will be in your Ethereum wallet.

## Complete withdrawal after reset/upgrade

If your withdrawal transaction was not completed before the Vega network was restarted or upgraded, follow the steps below.

Before a network upgrade or planned restart, a snapshot is taken of the network, which can be used to retrieve the details of an an unfinished withdrawal.

### Get transaction data
1. Find the public key that you started the withdrawal from. Ask the Vega team for the JSON of your transaction. Ask on [Discord ↗](https://vega.xyz/discord) or email `hi@vega.xyz`. **Confirm that you are in contact with someone from the actual Vega team.**

### Interact with bridge contract
2. Once you have the transaction JSON, go to the ERC-20 bridge contract on Etherscan. `etherscan.io/address/[erc20_bridge_logic_address]#code`. (See above for the address.)
3. Click on the `Contract` tab
4. Click on the `Write Contract` tab
5. Click on `Connect to Web3`, which will prompt you to connect to your Ethereum wallet. 
6. Once your wallet is connected, navigate back to Etherscan and click on number 10: `withdraw_asset`
7. Complete the form using the information from the JSON you were sent. 
8. Click `Write` and follow the instructions in your Ethereum wallet. If you see an error, check the information you have entered. It's not possible for the information in the JSON sent by a Vega team member to be incorrect. If you do get an error from your Ethereum wallet such as "this transaction will revert”, or “impossible to estimate gas cost” then **reject the transaction** and redo the process from step 7.
9. ✅ Your transaction is then complete and your tokens will be in your Ethereum wallet.
