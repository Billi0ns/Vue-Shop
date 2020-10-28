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
      size="lg"
    >
      <app-product-form
        submitMode="addData"
        @makeToast="$_makeToast('已成功新增產品!')"
      ></app-product-form>
    </b-modal>

    <table class="table">
      <thead class="thead-light">
        <tr>
          <th scope="col">分類</th>
          <th scope="col">產品名稱</th>
          <th scope="col">順序</th>
          <th scope="col">售價</th>
          <th scope="col">狀態</th>
          <th scope="col">建立日期</th>
          <th scope="col">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.category }}</td>
          <td>{{ product.title }}</td>
          <td>{{ product.orderNum }}</td>
          <td>{{ product.price | formatNumber }}</td>
          <td v-if="product.isEnabled" :style="{ color: '#28a745' }">已啟用</td>
          <td v-else :style="{ color: '#6c757d' }">未啟用</td>
          <td>{{ getReadableDate(product.createdAt) }}</td>
          <td>
            <b-button
              variant="primary"
              class="mr-3"
              v-b-modal="'edit-modal'"
              @click="activeProduct = product"
            >
              編輯
            </b-button>

            <b-button
              variant="danger"
              v-b-modal="'delete-modal'"
              @click="activeProduct = product"
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
      size="lg"
    >
      <app-product-form
        submitMode="editData"
        :activeProduct="activeProduct"
        @makeToast="$_makeToast('已成功編輯產品!')"
      ></app-product-form>
    </b-modal>

    <b-modal id="delete-modal" title="刪除商品">
      <p>
        {{ `是否刪除 【${activeProduct.title}】  商品(刪除後將無法恢復)。` }}
      </p>
      <template v-slot:modal-footer="{ cancel }">
        <b-button size="sm" variant="outline-secondary" @click="cancel()">
          取消
        </b-button>
        <b-button size="sm" variant="danger" @click="deleteProduct()">
          確認
        </b-button>
      </template>
    </b-modal>
  </b-container>
</template>

<script>
import AppProductForm from '@/components/AppProductForm.vue';
import { fb, db } from '../firebase';

export default {
  data() {
    return {
      products: [],
      activeProduct: {},
    };
  },
  components: {
    AppProductForm,
  },
  methods: {
    getReadableDate(timestamp) {
      return new Date(timestamp.seconds * 1000).toLocaleDateString('zh-tw');
    },
    deleteImage(imageUrl) {
      const imageRef = fb.storage().refFromURL(imageUrl);

      imageRef
        .delete()
        .then(() => {
          console.log('Image deleted!');
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteProduct() {
      const { id } = this.activeProduct;
      const imageUrl = this.activeProduct.imageFile;

      db.collection('products')
        .doc(id)
        .delete()
        .then(() => {
          if (imageUrl) {
            this.deleteImage(imageUrl);
          }
          console.log('Document successfully deleted!');
          this.$bvModal.hide('delete-modal');
          this.$_makeToast('已成功刪除產品!');
        })
        .catch((error) => {
          console.error('Error removing document: ', error);
        });
    },
  },
  created() {
    db.collection('products')
      .orderBy('category')
      .orderBy('orderNum')
      .onSnapshot((snapshot) => {
        this.products = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("All data in 'products' collection", this.products);
      });
  },
};
</script>

<style lang="scss" scoped></style>
