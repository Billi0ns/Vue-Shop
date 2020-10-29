<template>
  <b-form @submit="submitForm">
    <div class="row">
      <div class="col-lg-5">
        <b-form-group label="上傳圖片" label-for="inputImage">
          <b-form-file
            placeholder="選擇檔案或將檔案拖曳至此"
            drop-placeholder="Drop file here..."
            accept="image/jpeg, image/png, image/gif"
            @change="uploadImage"
          ></b-form-file>
        </b-form-group>

        <b-form-group v-if="form.imageFile" class="image-container pt-3">
          <b-img
            :src="form.imageFile"
            fluid
            thumbnail
            class="img-thumbnail"
          ></b-img>
          <span class="delete-img" @click="deleteImage">x</span>
        </b-form-group>
      </div>
      <div class="col-lg-7">
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
            <b-form-group label="單位" label-for="inputUnit">
              <b-form-input id="inputUnit" v-model="form.unit"> </b-form-input>
            </b-form-group>
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col>
            <b-form-group label="售價" label-for="inputPrice">
              <b-form-input id="inputPrice" v-model="form.price" required>
              </b-form-input>
            </b-form-group>
          </b-col>

          <b-col>
            <b-form-group label="上架順序" label-for="inputOrderNum">
              <b-form-input id="inputOrderNum" v-model="form.orderNum" required>
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

        <b-form-group>
          <b-form-checkbox
            id="product-checkbox"
            v-model="form.isEnabled"
            name="product-checkbox"
          >
            是否啟用
          </b-form-checkbox>
        </b-form-group>
      </div>
    </div>

    <b-button type="submit" variant="dark" class="btn-block">
      確認
    </b-button>
  </b-form>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { fb, db } from '../firebase';

export default {
  data() {
    return {
      form: {
        title: null,
        category: null,
        unit: null,
        price: null,
        description: null,
        imageFile: null,
        isEnabled: false,
        orderNum: 0,
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
        .add({
          createdAt: new Date(Date.now()),
          ...this.form,
        })
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id);
          this.$emit('makeToast');
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
          this.handleError(error);
        });
    },
    updateProduct(id) {
      db.collection('products')
        .doc(id)
        .update(this.form)
        .then(() => {
          console.log('Document updated');
          this.$emit('makeToast');
        })
        .catch((error) => {
          console.error('Error updating document: ', error);
          this.handleError(error);
        });
    },
    uploadImage(e) {
      if (e.target.files[0]) {
        const file = e.target.files[0];
        const uuid = uuidv4();

        const storageRef = fb.storage().ref(`products/${uuid}`);
        const uploadTask = storageRef.put(file);

        uploadTask.on(
          'state_changed',
          () => {
            // Observe state change events such as progress, pause, and resume
          },
          (error) => {
            console.log(error);
            this.handleError(error);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              this.form.imageFile = downloadURL;

              console.log('File available at', downloadURL);
              if (this.submitMode === 'editData') {
                this.updateProduct(this.activeProduct.id);
              }
            });
            // eslint-disable-next-line comma-dangle
          }
        );
      }
    },
    deleteImage() {
      const imageRef = fb.storage().refFromURL(this.form.imageFile);

      imageRef
        .delete()
        .then(() => {
          this.form.imageFile = null;

          if (this.submitMode === 'editData') {
            this.updateProduct(this.activeProduct.id);
          }
          console.log('Image deleted!');
        })
        .catch((error) => {
          console.log(error);
          this.handleError(error);
        });
    },
    submitForm(evt) {
      evt.preventDefault();

      if (this.submitMode === 'addData') {
        this.addProduct();
        this.$bvModal.hide('add-modal');
      } else if (this.submitMode === 'editData') {
        this.updateProduct(this.activeProduct.id);
        this.$bvModal.hide('edit-modal');
      } else {
        console.log('error!');
      }
    },
    handleError(error) {
      if (
        error.code === 'storage/unauthorized' ||
        error.code === 'permission-denied'
      ) {
        alert('訪客帳號只能讀取，無法寫入資料庫！');
      }
    },
  },
  created() {
    if (this.submitMode === 'editData') {
      this.form = { ...this.activeProduct };
      delete this.form.id;
    }
  },
};
</script>

<style lang="scss" scoped>
.image-container {
  position: relative;
}

.img-thumbnail {
  max-height: 300px;
}

.delete-img {
  position: absolute;
  top: 8px;
  left: 6px;
  font-size: 25px;
  cursor: pointer;
}
</style>
