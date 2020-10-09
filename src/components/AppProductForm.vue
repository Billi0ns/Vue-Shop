<template>
  <b-form>
    <b-form-group label="標題" label-for="inputTitle">
      <b-form-input id="inputTitle" v-model="form.title" required>
      </b-form-input>
    </b-form-group>

    <b-form-row>
      <b-col>
        <b-form-group label="分類" label-for="inputCategory">
          <b-form-input id="inputCategory" v-model="form.category" required>
          </b-form-input>
        </b-form-group>
      </b-col>

      <b-col>
        <b-form-group label="售價" label-for="inputPrice">
          <b-form-input id="inputPrice" v-model="form.price" required>
          </b-form-input>
        </b-form-group>
      </b-col>
    </b-form-row>

    <hr />

    <b-form-group label="產品描述" label-for="inputDescription">
      <b-form-textarea
        id="inputDescription"
        v-model="form.description"
        rows="3"
        required
      ></b-form-textarea>
    </b-form-group>

    <b-form-group label="圖片網址" label-for="inputImage">
      <b-form-input
        id="inputImage"
        v-model="form.imageUrl"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group>
      <b-form-checkbox
        id="product-checkbox"
        v-model="form.isEnabled"
        name="product-checkbox"
        value="true"
        unchecked-value="false"
      >
        是否啟用
      </b-form-checkbox>
    </b-form-group>

    <b-button
      type="submit"
      variant="dark"
      class="btn-block"
      @click.prevent="submitForm()"
    >
      確認
    </b-button>
  </b-form>
</template>

<script>
import { db } from '../firebase';

export default {
  data() {
    return {
      form: {
        title: null,
        category: null,
        price: null,
        description: null,
        imageUrl: null,
        isEnabled: false,
      },
    };
  },
  props: {
    activeProduct: Object,
    submitMode: String,
  },
  methods: {
    addProduct() {
      db.collection('products')
        .add(this.form)
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id);
          this.$bvModal.hide('add-modal');
          this.$emit('makeToast');
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });
    },
    updateProduct(id) {
      db.collection('products')
        .doc(id)
        .update(this.form)
        .then(() => {
          console.log('Document updated');
          this.$bvModal.hide('edit-modal');
          this.$emit('makeToast');
        })
        .catch((error) => {
          console.error('Error updating document: ', error);
        });
    },
    resetForm() {
      Object.assign(this.$data, this.$options.data.apply(this));
    },
    submitForm() {
      if (this.submitMode === 'addData') {
        this.addProduct();
      } else if (this.submitMode === 'editData') {
        this.updateProduct(this.activeProduct.id);
      } else {
        console.log('error!');
      }
    },
  },
  created() {
    if (this.submitMode === 'editData') {
      this.form = { ...this.activeProduct };
      delete this.form.id;
    }
  },
  mounted() {
    this.$root.$on('bv::modal::hidden', () => {
      this.resetForm();
    });
  },
};
</script>

<style lang="scss" scoped></style>
