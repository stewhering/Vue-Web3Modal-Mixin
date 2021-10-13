# Web3Modal + Vue JS Mixin

This Vue 2 mixin wraps the [Web3Modal](https://www.npmjs.com/package/web3modal) package allowing for simple integration of Web3 into any vapp.

___

## Usage
1 - Import the mixin module.


```
import Web3ModalMixin from "./Vue-Web3Modal-Mixin/mixin.js";
```

2 - Configure `Web3Modal`. A full description of `Web3Modal` options can be found in the [package's README on GitHub](https://github.com/Web3Modal/web3modal/blob/master/README.md).


```
const web3ModalOptions = {
    network: "mainnet",                 // optional
    cacheProvider: true,                // optional
    disableInjectedProvider: false,     // optional
    providerOptions: {                  // required
        // ...
    },
    theme: {                            // optional
        //  ...
    }
};
```

3 - Initialize the mixin and inject into vapp root
```
new Vue({
    // ...
    mixins: [
        Web3ModalMixin(web3ModalOptions),
        // ...
    ],
    render: h => h(App)
}).$mount('#app');
```

4 - Use the mixin within components by accessing `$root`.

```
<button type="button" v-if="$root.web3Account === null" v-on:click="onBtnClick">Connect your wallet.</button>
<p v-if="$root.web3Account !== null">Connected to address {{ $root.web3Address }}.</p>
```

```
Vue.component('connect-wallet-btn', {
    data: function() {
        return {
            // ...
        }
    },
    methods: {
        onBtnClick: async function() {
            await this.$root.connectWeb3();
            this.btnText = "Your wallet is connected!";
        }
    }
});
```
___

## API

### Data
- `web3::Object<Web3>`
- `web3Provider::Object<Web3.provider>` 
- `cachedWeb3Provider::String`
- `web3Account::String`
- `web3Chain::Number`

### Methods
- `connectWeb3()::Promise<void>`
- `connectWeb3To(id::String)::Promise<void>`
- `disconnectWeb3()::Promise<void`
- `cacheWeb3Provider()::void`
- `getInjectedWeb3Provider()::Object<IProviderInfo>`
- `getInjectedWeb3ProviderName()::String`

### Events
- `Web3Connect`
- `Web3AccountChange`
- `Web3ChainChange`
- `Web3Disconnect`
- `Web3NewChainBlock`

Listen for events emitted from `$root` within components.
```
Vue.component('connect-wallet-btn', {
    // ...
    mounted: function() {

        this.$root.$on('Web3Connect' () => {
            // ...
        });

        this.$root.$on('Web3AccountChange' () => {
            // ...
        });

        this.$root.$on('Web3ChainChange' () => {
            // ...
        });

        this.$root.$on('Web3Disconnect' () => {
            // ...
        });

        this.$root.$on('Web3NewChainBlock' () => {
            // ...
        });

    }
});
```
