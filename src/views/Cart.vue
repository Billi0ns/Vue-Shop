;<template>
  <div>
    <app-header></app-header>
    <app-cart-items></app-cart-items>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import AppCartItems from '@/components/AppCartItems.vue';

export default {
  name: 'Products',
  components: {
    AppHeader,
    AppCartItems,
  },
};
</script>

<style lang="scss" scoped></style>
