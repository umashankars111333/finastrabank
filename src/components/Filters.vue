<template>
  <div class="filters">
    <div>
      <v-btn v-model="sortFlag" outlined color="#137E69" :small="$vuetify.breakpoint.width < 550" @click="sortBy('title')" class="sortBy large mr-0">
        <v-icon :x-small="$vuetify.breakpoint.width < 550" :small="$vuetify.breakpoint.width >= 550" :left="$vuetify.breakpoint.width >= 550" :class="$vuetify.breakpoint.width < 550 ? 'mr-2' : ''"
          >fas fa-sort-alpha-down</v-icon
        >
        <span class="text-capitalize">By Product Name</span>
      </v-btn>
    </div>

    <div>
      <v-hover>
        <v-menu :close-on-content-click="closeSearchMenuOnContentClick" :nudge-width="200" offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn outlined color="#137E69" :small="$vuetify.breakpoint.width < 550" v-on="on" v-bind="attrs" @click="closeSearchMenuOnContentClick = false">
              <span class="text-capitalize">Search</span>
              <v-icon
                :x-small="$vuetify.breakpoint.width < 550"
                :small="$vuetify.breakpoint.width >= 550"
                :right="$vuetify.breakpoint.width >= 550"
                :class="$vuetify.breakpoint.width < 550 ? 'ml-2' : ''"
                >fas fa-search</v-icon
              >
            </v-btn>
          </template>

          <v-list class="text-center">
            <v-list-item class="mt-3">
              <v-text-field color="#137E69" label="Search" hide-details="auto" class="search mb-5 mx-auto" v-model="searchTitle"></v-text-field>
            </v-list-item>

            <v-list-item class="text-center">
              <v-btn dark color="#137E69" class="text-capitalize" @click="search">
                Search
                <v-icon small right>fas fa-search</v-icon>
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-hover>
    </div>

    <div>
      <v-hover>
        <v-menu :close-on-content-click="closeFilterMenuOnContentClick" :nudge-width="200" offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn outlined color="#137E69" :small="$vuetify.breakpoint.width < 550" v-on="on" v-bind="attrs" @click="closeFilterMenuOnContentClick = false">
              <v-icon
                :x-small="$vuetify.breakpoint.width < 550"
                :small="$vuetify.breakpoint.width >= 550"
                :left="$vuetify.breakpoint.width >= 550"
                :class="$vuetify.breakpoint.width < 550 ? 'mr-2' : ''"
                >fas fa-filter</v-icon
              >
              <span class="text-capitalize">Filter</span>
            </v-btn>
          </template>

          <v-list class="text-center">
            <v-list-item class="mt-3">
              <v-select color="#137E69" :items="filteringProductTypes" label="Select Product Type" solo v-model="selectedProductType"></v-select>
            </v-list-item>

            <v-list-item>
              <v-select
                color="#137E69"
                :disabled="!selectedProductType || selectedProductType == 'None'"
                :items="filteringProducts"
                label="Select Product"
                solo
                class="filteringProducts"
                v-model="selectedProduct"
              ></v-select>
            </v-list-item>

            <v-list-item>
              <v-btn class="text-capitalize mx-auto" @click="filter" :disabled="!selectedProductType">
                Filter
                <v-icon right>fas fa-filter</v-icon>
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-hover>
    </div>
  </div>
</template>

<script>
export default {
  name: "Filters",
  props: ["products", "filteredProducts"],
  data() {
    return {
      selectedProductType: null,
      selectedProduct: null,
      searchTitle: "",

      filteringProductTypes: ["None", "Accounts", "Deposits"],

      filteringProducts: ["None", "Savings Accounts", "Fixed Deposits"],
      closeSearchMenuOnContentClick: false,
      closeFilterMenuOnContentClick: false,
      localFilteredProducts: { ...this.filteredProducts },
      sortFlag: false,
    };
  },
  methods: {
    sortBy(property) {
      if (!this.sortFlag) {
        this.localFilteredProducts = JSON.parse(JSON.stringify(this.products));
        Object.keys(this.localFilteredProducts).forEach((productType) => {
          Object.keys(this.localFilteredProducts[productType]).forEach((productSubCategory) => {
            this.localFilteredProducts[productType][productSubCategory].sort((a, b) => (a[property] < b[property] ? -1 : 1));
          });
        });
      } else {
        this.localFilteredProducts = { ...this.products };
      }
      this.sortFlag = !this.sortFlag;
      this.$emit("updateFilteredProducts", this.localFilteredProducts);
    },
    search() {
      this.closeSearchMenuOnContentClick = true;
      this.localFilteredProducts = {};

      if (this.searchTitle == "") {
        this.localFilteredProducts = { ...this.products };
      } else {
        Object.keys(this.products).forEach((productType) => {
          this.localFilteredProducts[productType] = {};
          Object.keys(this.products[productType]).forEach((productSubCategory) => {
            this.localFilteredProducts[productType][productSubCategory] = [];
            this.products[productType][productSubCategory].forEach((product) => {
              if (product.title.toLowerCase().includes(this.searchTitle.toLowerCase())) {
                this.localFilteredProducts[productType][productSubCategory].push(product);
              }
            });

            //If there are no products under the product sub category, to avoid rendering Product Type heading
            if (this.localFilteredProducts[productType][productSubCategory].length == 0) {
              delete this.localFilteredProducts[productType][productSubCategory];
            }
          });
        });
      }
      this.$emit("updateFilteredProducts", this.localFilteredProducts);
      this.searchTitle = "";
    },

    toCamelCase(text) {
      return text
        .replace(/\s(\w)/gi, function(all, letter) {
          return letter.toUpperCase();
        })
        .replace(/(^\w)/, function($1) {
          return $1.toLowerCase();
        });
    },

    filter() {
      this.closeFilterMenuOnContentClick = true;
      if (this.selectedProductType == "None") {
        this.localFilteredProducts = { ...this.products };
      }

      //If only Product type is provided in FILTER SECTION

      // Initialization needed
      else if ((this.selectedProductType && !this.selectedProduct && this.selectedProductType != "None" && !this.selectedProduct) || (this.selectedProductType && this.selectedProduct === "None")) {
        this.localFilteredProducts = {};

        Object.keys(this.products).forEach((productType) => {
          this.localFilteredProducts[productType] = {};
        });

        this.localFilteredProducts[this.toCamelCase(this.selectedProductType)] = { ...this.products[this.toCamelCase(this.selectedProductType)] };
      } else {
        //If both product type and product is provided in FILTER SECTION
        //Initialization needed
        this.localFilteredProducts = {};

        this.localFilteredProducts[this.toCamelCase(this.selectedProductType)] = {};
        this.localFilteredProducts[this.toCamelCase(this.selectedProductType)][this.toCamelCase(this.selectedProduct)] = [
          ...this.products[this.toCamelCase(this.selectedProductType)][this.toCamelCase(this.selectedProduct)],
        ];
      }
      this.$emit("updateFilteredProducts", this.localFilteredProducts);
    },
  },
};
</script>

<style>
@media only screen and (min-width: 401px) {
  .filters {
    display: flex;
    flex-direction: row-reverse;
    margin-top: 20px;
  }
}

@media only screen and (max-width: 400px) {
  .filters div {
    display: flex;
    flex-direction: row-reverse;
  }
}
.filters div {
  padding: 5px;
  padding-top: 5px;
}

.v-list .v-list-item--active .v-list-item__title {
  color: #106655 !important;
}
</style>
