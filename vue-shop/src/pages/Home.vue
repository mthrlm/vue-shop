<template>
    <div>
      <Header />
  
      <ProductCatalog />
    </div>
  </template>
  
  <script>
  import Header from '@/components/Header.vue';
  import ProductCatalog from '@/components/ProductCatalog.vue';
  
  export default {
    name: 'Home',
    components: {
      Header,
      ProductCatalog
    }
  };
  </script>
  