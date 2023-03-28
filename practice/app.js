Vue.component('CoinDetail', {

  props: [
    'coin',
    'color'
  ],

  data(){
    return{
      showPrices: false,
      value: 0,
    }
  },

  methods: {
    toggleShowPrices () {
      this.showPrices = !this.showPrices;

      this.$emit('change-color')
    }
  },

  computed: {
    title () {
      return `${this.coin.name} - ${this.coin.symbol}`
    },

    convertedValue() {
      if(this.value === 0){
        return 0;
      } else {
        return this.value / this.coin.price;
      }
    }
  },

  template: `
    <div>
      <img
        v-on:mouseover="toggleShowPrices"
        v-on:mouseout="toggleShowPrices"
        :src="coin.img"
        :alt="coin.name"
      />
      <h1 :class="coin.changePercent > 0 ? 'green' : 'red' ">
        {{ title }}
        <span v-if="coin.changePercent > 0">👌</span>
        <span v-else-if="coin.changePercent < 0">👎</span>
        <span v-else>🍀</span>
      </h1>
      <button v-on:click="toggleShowPrices">{{ showPrices ? 'Hide prices' : 'Show prices'}}</button>

      <input type="number" v-model="value" />
      <span>{{ convertedValue }}</span>

      <slot name="text"></slot>
      <slot name="link"></slot>

      <ul v-show="showPrices === true">
        <li 
          class="uppercase"
          :class="{ orange: number.value == coin.price, red: number.value < coin.price, green: number.value > coin.price}"
          v-for="(number, i) in coin.pricesWithDays"
          :key="i">{{ number.day }} - {{ number.value }}</li>
      </ul>
    </div>
  `
})

new Vue({
  el: '#app',

  data() {
    return{
      btc: {
        name: 'Bitcoin',
        symbol: 'BTC',
        img: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
        changePercent: 10,
        price: 8400,
        pricesWithDays: [
          { day: 'Monday', value: 8400 },
          { day: 'Tuesday', value: 7900 },
          { day: 'Wednesday', value: 8200 },
          { day: 'Thursday', value: 9000 },
          { day: 'Friday', value: 9400 },
          { day: 'Saturday', value: 10000 },
          { day: 'Sunday', value: 10200 },
        ],
      },
      
      color: 'f4f4f4',
    }
  },

  methods: {
    updateColor () {
      this.color = this.color.split('').reverse().join('')
    }
  }
})