<template>
  <b-container fluid="md" class="mt-3">
    <!-- <b-table outlined hover :head-variant="light" :items="items"></b-table> -->
    <table class="table">
      <thead class="thead-light">
        <tr>
          <th scope="col">age</th>
          <th scope="col">firstname</th>
          <th scope="col">lastname</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.age }}</td>
          <td>{{ item.first_name }}</td>
          <td>{{ item.last_name }}</td>
        </tr>
      </tbody>
    </table>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { age: 38, first_name: 'Jami', last_name: 'Carney' },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
