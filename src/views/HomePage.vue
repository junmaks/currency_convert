<template>
  <div class="home-page">
    <div class="home-page__wrapper">
      <div class="home-page__content">
        <Navbar />
        <div class="home-page__content-body">
          <div class="home-page__content-body-main">
            <div class="home-page__content-body-main__wrapper">
              <custom-select
                class="selector-wrapper"
                v-model="firstCurrency"
                :options="curencyOptions"
              >
                <option :value="null" disabled selected>Выберите валюту</option>
              </custom-select>
              <CustomInput v-model="userValue" @input="getCurrentValue" />
            </div>
            <div class="home-page__content-body-main__wrapper">
              <span> {{ "=" }} </span>
            </div>
            <div class="home-page__content-body-main__wrapper">
              <custom-select
                class="selector-wrapper"
                :options="curencyOptions"
                v-model="secondCurrency"
              >
                <option :value="null" disabled selected>Выберите валюту</option>
              </custom-select>
              <custom-input
                placeholder="Результат"
                v-model="currentValue"
                readonly="readonly"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import CustomInput from "@/components/UI/CustomInput.vue";
import CustomSelect from "@/components/UI/CustomSelect.vue";
import currencyApi from "@/services/api_func";
import throttle from 'lodash.throttle';

export default {
  name: "HomePage",
  components: {
    Navbar,
    CustomInput,
    CustomSelect,
  },
  data() {
    return {
      currentValue: null,
      userValue: null,
      firstCurrency: null,
      secondCurrency: null,
      curencyOptions: [],
      
    };
  },
  mounted() {
    let userLang = navigator.language || navigator.userLanguage;
    switch (userLang.toLowerCase()) {
      case 'en-gb':
        this.firstCurrency = 'GBP'
        break;
      case 'ru-ru' || 'ru':
        this.firstCurrency = 'RUB'
        break;
      case 'en-us':
        this.firstCurrency = 'USD'
        break;
      default:
        this.firstCurrency = null
    }
    this.getCurrenies();
  },
  methods: {
    async getCurrenies() {
      const response = await currencyApi.getCurrency()
      const data_res = response.data.symbols;
      Object.keys(data_res).forEach((elem) => {
        this.curencyOptions.push({
          value: elem,
          text: data_res[elem],
        });
      });
    },
    async getResult() {
      if (this.firstCurrency && this.secondCurrency) {
        const params = {
          fromCurrency: this.firstCurrency,
          toCurrency: this.secondCurrency,
          amount: this.userValue,
        };
        const result = await currencyApi.getValueByCurrency(params);
        this.currentValue = result.data.result
      } else {
        alert('Выберите валютную пару')
      }
    },
    getCurrentValue: throttle(async function () {
      this.getResult()
    }, 2000)
  },
};
</script>

<style scoped lang="scss">
.selector-wrapper {
  margin: 10px 0;
}
.home-page {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  background-image: url("@/assets/images/currency_wall.png");
  color: white;
  &__wrapper {
    height: 100%;
    width: 100%;
    background-color: rgba(1, 1, 1, 0.7);
    display: grid;
  }
  &__content {
    max-width: 1280px;
    margin: 0 auto;
    width: 100%;
    position: relative;
  }
  &__content-body {
    height: auto;
    margin-top: 0;
    width: 100%;
    justify-content: center;
    display: flex;
    align-items: center;
    height: calc(100vh - 50px);
    &-main {
      display: flex;
      justify-content: space-around;
      &__wrapper {
        display: grid;
        margin: 10px;
        align-items: center;
        font-size: 24px;
      }
    }
  }
}
</style>
