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
  <div class="mx-auto max-h-screen sm:w-full xl:w-6">
    <Card class="mb-3">
      <template #title> EMI Calculator (interactive) </template>
      <template #content>
        <div class="flex flex-column sm:flex-row flex-row">
          <div class="flex-1">
            <div class="w-full my-5">
              <div class="flex justify-content-between">
                <h4 class="text-cyan-900">Loan Amount</h4>
                <Badge :value="amount + '€'" size="large" severity="success" />
              </div>
              <Slider v-model="amount" :min="1000" :max="100000" :step="100" class="h-1rem" />
            </div>

            <div class="w-full my-5">
              <div class="flex justify-content-between">
                <h4 class="text-cyan-900">Interest Rate</h4>
                <Badge :value="interest + '%'" size="large" severity="success" />
              </div>
              <Slider v-model="interest" :min="1" :max="50" :step=".1" class="h-1rem" />
            </div>

            <div class="w-full my-5">
              <div class="flex justify-content-between">
                <h4 class="text-cyan-900">Loan Tenure</h4>
                <Badge :value="tenure + ' Years'" size="large" severity="success" />
              </div>
              <Slider v-model="tenure" :min="1" :max="100" :step=".5" class="h-1rem" />
            </div>
          </div>
          <div class="flex-1 xl:pl-8">
            <Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-25rem sm:w-21rem" />
          </div>
        </div>
        <div class="container">
          <div class="flex flex-column bg-gray-100 mt-6 px-5 py-3">
            <h3 class="text-cyan-900">EMI: <span class="text-cyan-600"> {{ calculateEmi(amount, interest, tenure) }}€</span></h3>
            <h3 class="text-cyan-900">Principle Amount: <span class="text-cyan-600"> {{ amount }}€</span></h3>
            <h3 class="text-cyan-900">Total Interest: <span class="text-cyan-600"> {{ ((interest * amount * tenure) / 100).toFixed(2) }}€</span></h3>
            <h3 class="text-cyan-900">Total Amount: <span class="text-cyan-600"> {{ (((interest * amount * tenure) / 100) + amount).toFixed(2) }}€</span></h3>
          </div>
        </div>
      </template>
    </Card>
  <NuxtLink to="/ordinary">
    <Button icon="pi pi-backward" size="small" severity="secondary" text raised />
  </NuxtLink>
  </div>
</template>

<style scoped></style>
