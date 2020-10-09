<template>
  <b-container fluid="md" class="mt-3">
    <b-button class="mb-3 d-flex" v-b-modal="'add-modal'">
      新增產品
    </b-button>

    <b-modal
      id="add-modal"
      title="新增產品"
      hide-footer
      header-bg-variant="dark"
      headerTextVariant="light"
    >
      <app-product-form
        submitMode="addData"
        @makeToast="makeToast('新增')"
      ></app-product-form>
    </b-modal>

    <table class="table">
      <thead class="thead-light">
        <tr>
          <th scope="col">分類</th>
          <th scope="col">產品名稱</th>
          <th scope="col">售價</th>
          <th scope="col">狀態</th>
          <th scope="col">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.isEnabled }}</td>
          <td>
            <b-button
              variant="primary"
              class="mr-3"
              v-b-modal="'edit-modal'"
              @click="activeProduct = item"
            >
              編輯
            </b-button>

            <b-button
              variant="danger"
              v-b-modal="'delete-modal'"
              @click="activeProduct = item"
            >
              刪除
            </b-button>
          </td>
        </tr>
      </tbody>
    </table>

    <b-modal
      id="edit-modal"
      title="編輯產品"
      hide-footer
      header-bg-variant="dark"
      headerTextVariant="light"
    >
      <app-product-form
        submitMode="editData"
        :activeProduct="activeProduct"
        @makeToast="makeToast('編輯')"
      ></app-product-form>
    </b-modal>

    <b-modal id="delete-modal" title="刪除商品">
      <p>
        {{ `是否刪除 ${activeProduct.title}  商品(刪除後將無法恢復)。` }}
      </p>
      <template v-slot:modal-footer="{ cancel }">
        <b-button size="sm" variant="outline-secondary" @click="cancel()">
          取消
        </b-button>
        <b-button
          size="sm"
          variant="danger"
          @click="deleteProduct(activeProduct.id)"
        >
          確認
        </b-button>
      </template>
    </b-modal>
  </b-container>
</template>

<script>
import AppProductForm from '@/components/AppProductForm.vue';
import { db } from '../firebase';

export default {
  data() {
    return {
      items: [],
      activeProduct: {},
    };
  },
  components: {
    AppProductForm,
  },
  methods: {
    deleteProduct(id) {
      db.collection('products')
        .doc(id)
        .delete()
        .then(() => {
          console.log('Document successfully deleted!');
          this.$bvModal.hide('delete-modal');
          this.makeToast('刪除');
        })
        .catch((error) => {
          console.error('Error removing document: ', error);
        });
    },
    makeToast(toastAction) {
      this.$bvToast.toast(`已成功${toastAction}產品!`, {
        autoHideDelay: 3000,
        variant: 'success',
        solid: true,
      });
    },
  },
  created() {
    db.collection('products').onSnapshot((snapshot) => {
      this.items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("All data in 'products' collection", this.items);
    });
  },
};
</script>

<style lang="scss" scoped></style>
