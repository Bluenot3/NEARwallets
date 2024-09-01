const nearAPI = window.nearApi;
const { connect, keyStores, WalletConnection } = nearAPI;

// Configuration details for the NEAR network
const nearConfig = {
    networkId: 'testnet',
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://wallet.testnet.near.org',
    deps: {
        keyStore: new keyStores.BrowserLocalStorageKeyStore()
    }
};

// Initialize connection to the NEAR network
async function initializeNear() {
    const near = await connect(nearConfig);
    return new WalletConnection(near);
}

// Execute payment transaction and provide access to content if successful
async function connectAndPay() {
    const wallet = await initializeNear();

    if (!wallet.isSignedIn()) {
        const depositAmountInYocto = nearAPI.utils.format.parseNearAmount('0.2');
        wallet.requestSignIn({
            contractId: 'nearnvidia.testnet',  // Replace with your contract ID
            methodNames: ['add_access'],  // Method name in your contract
            amount: depositAmountInYocto,
            successUrl: window.location.href,
        });
    } else {
        // Signed in callback actions here, i.e., provide access to the content
        console.log(`Access Granted to ${wallet.getAccountId()}`);
    }
}

window.connectAndPay = connectAndPay;
