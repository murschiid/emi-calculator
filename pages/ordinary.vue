<script setup>
import Chart from 'primevue/chart';
const chartData = ref();
const chartOptions = ref(null);
const amount = ref(10000);
const interest = ref(10);
const tenure = ref(20);

onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

watch([amount, interest, tenure], () => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

const calculateEmi = (amount, interest, tenure) => {
  const monthlyInterestRate = interest / (12 * 100);
  const numberOfPayments = tenure * 12;
  const emi = (amount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
  return emi.toFixed(2);
};

const setChartData = () => {
  const documentStyle = getComputedStyle(document.body);
  return {
    labels: ['Principle Amount', 'Interest Amount'],
    datasets: [{
      data: [amount.value, (interest.value * amount.value * tenure.value) / 100],
      backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500')],
      hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400')]
    }]
  };
};

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--text-color');
  return {
    plugins: {
      legend: {
        labels: {
          cutout: '60%',
          color: textColor
        }
      }
    }
  };
};
</script>

<template>
  <div class="mx-auto max-h-screen sm:w-12 xl:w-6">
    <Card class="mb-3">
      <template #title> EMI Calculator (ordinary) </template>
      <template #content>
        <div class="flex">
          <div class="flex-1">
            <div class="w-full my-1">
              <div class="flex justify-content-between">
                <h4 class="text-cyan-900">Loan Amount</h4>
              </div>
              <InputNumber v-model="amount" inputId="integeronly" mode="currency" currency="EUR" :min="1000" :max="100000" class="w-full" />
            </div>

            <div class="w-full my-1">
              <div class="flex justify-content-between">
                <h4 class="text-cyan-900">Interest Rate</h4>
              </div>
              <InputNumber v-model="interest" inputId="minmaxfraction" :minFractionDigits="1" :maxFractionDigits="2" :min="1" :max="50" invalid mode="decimal" class="w-full" />
            </div>

            <div class="w-full my-1">
              <div class="flex justify-content-between">
                <h4 class="text-cyan-900">Loan Tenure</h4>
              </div>
              <InputNumber v-model="tenure" inputId="minmaxfraction" :minFractionDigits="1" :maxFractionDigits="2" :min="1" :max="100" invalid mode="decimal" class="w-full" />
            </div>

            <div class="bg-gray-100 mt-6 px-5 py-3">
              <h3 class="text-cyan-900">EMI: {{ calculateEmi(amount, interest, tenure) }}€</h3>
              <h3 class="text-cyan-900">Principle Amount: {{ amount }}€</h3>
              <h3 class="text-cyan-900">Total Interest: {{ ((interest * amount * tenure) / 100).toFixed(2) }}€</h3>
              <h3 class="text-cyan-900">Total Amount: {{ (((interest * amount * tenure) / 100) + amount).toFixed(2) }}€</h3>
            </div>
          </div>
          <!-- <div class="flex-1 pl-8">
          <Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-full w-25rem" />
        </div> -->
        </div>
      </template>
    </Card>
    <NuxtLink to="/">
      <Button icon="pi pi-backward" size="small" severity="secondary" text raised />
    </NuxtLink>
  </div>
</template>

<style scoped></style>
