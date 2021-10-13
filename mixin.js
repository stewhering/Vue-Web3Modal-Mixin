import Web3 from "web3";
import Web3Modal, { getInjectedProvider, getInjectedProviderName } from "web3modal";

export default function(Web3ModalOptions) {

    let web3, web3Provider, web3Account, web3Chain;

    const web3Modal = new Web3Modal(Web3ModalOptions);

    return {
        created: async function() {
            if(web3Modal.cachedProvider || getInjectedProvider()){
                await this.connectWeb3();
            }
        },
        methods: {
            connectWeb3: async function() {
                web3Provider = await web3Modal.connect();

                web3Provider.on('connect', async (chainId) => {
                    web3Account = (await web3.eth.getAccounts())[0];
                    web3Chain = chainId;

                    web3.eth.subscribe('newBlockHeaders', () => {
                        this.$emit(`Web3NewChainBlock`);
                    });

                    this.$emit('Web3Connect');
                });

                web3Provider.on('accountsChanged', async (accounts) => {
                    web3Account = accounts[0];

                    this.$emit('Web3AccountChange');
                });

                web3Provider.on('chainChanged', async (chainId) => {
                    web3Account = (await web3.eth.getAccounts())[0];
                    web3Chain = chainId;

                    this.$emit('Web3ChainChange');
                });

                web3Provider.on('disconnect', async () => {
                    web3Account = undefined;
                    web3Chain = undefined;

                    this.$emit('Web3Disconnect');
                });

                web3 = new Web3(web3Provider);

                web3Account = (await web3.eth.getAccounts())[0];
                web3Chain = await web3.eth.getChainId();

                web3.eth.subscribe('newBlockHeaders', () => {
                    this.$emit(`Web3NewChainBlock`);
                });

                this.$emit('Web3Connect');
            },
            connectWeb3To: async function(id) {
                web3Provider = await web3Modal.connectTo(id);

                web3Provider.on('connect', async (chainId) => {
                    web3Account = (await web3.eth.getAccounts())[0];
                    web3Chain = chainId;

                    web3.eth.subscribe('newBlockHeaders', () => {
                        this.$emit(`Web3NewChainBlock`);
                    });

                    this.$emit('Web3Connect');
                });

                web3Provider.on('accountsChanged', async (accounts) => {
                    web3Account = accounts[0];

                    this.$emit('Web3AccountChange');
                });

                web3Provider.on('chainChanged', async (chainId) => {
                    web3Account = (await web3.eth.getAccounts())[0];
                    web3Chain = chainId;

                    this.$emit('Web3ChainChange');
                });

                web3Provider.on('disconnect', async () => {
                    web3Account = undefined;
                    web3Chain = undefined;

                    web3.eth.clearSubscriptions();
                    this.$emit('Web3Disconnect');
                });

                web3 = new Web3(web3Provider);

                web3Account = (await web3.eth.getAccounts())[0];
                web3Chain = await web3.eth.getChainId();

                web3.eth.subscribe('newBlockHeaders', () => {
                    this.$emit(`Web3NewChainBlock`);
                });

                this.$emit('Web3Connect');
            },
            disconnectWeb3: async function() {
                if(web3Provider && typeof web3Provider.close === "function"){
                    await this.web3Provider.close();
                }

                web3Modal.clearCachedProvider();

                web3.eth.clearSubscriptions();

                web3Account  = undefined;
                web3Chain = undefined;
                web3Provider = undefined;
                web3 = undefined;

                this.$emit('Web3Disconnect');
            },
            cacheWeb3Provider: function() {
                web3Modal.setCachedProvider();
            },
            clearWeb3Provider: function() {
                web3Modal.clearCachedProvider();
            },
            getInjectedWeb3Provider: function() {
                return getInjectedProvider();
            },
            getInjectedWeb3ProviderName: function() {
                return getInjectedProviderName();
            }
        },
        computed: {
            web3: {
                get: function() {
                    return web3 || null;
                }
            },
            web3Provider: {
                get: function() {
                    return web3Provider || null;
                }
            },
            cachedWeb3Provider: {
                get: function() {
                    return web3Modal.cacheProvider || null;
                }
            },
            web3Account: {
                get: function() {
                    return web3Account || null;
                }
            },
            web3Chain: {
                get: function() {
                    return web3Chain || null;
                }
            }
        }
    }

}
