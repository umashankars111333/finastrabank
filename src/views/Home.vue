<template>
	<div class="home" style="margin-left : auto; margin-right : auto">
		<!-- Filter Elements -->
		<Filters :products="products" @updateFilteredProducts="parentUpdateFilteredProducts" />

		<!-- No Products Found Banner -->
		<div v-show="areNoProductsFound()" class="text-center noProductsFound">
			<v-icon size="150" color="#DCDCDC">far fa-frown</v-icon>
			<span class="text-h4 d-block mt-6" style="color: #148F77">Sorry! No products found</span>
		</div>

		<!-- Products -->
		<div class="my-5" v-for="productType in Object.keys(filteredProducts)" :key="productType">
			<v-container v-if="Object.keys(filteredProducts[productType]).length > 0">
				<!-- Only If there are Sub categories under a product type -->

				<p style="float : none" class="display-1 font-weight-bold text-capitalize">{{ productType }}</p>
				<div v-for="productSubCategory in Object.keys(filteredProducts[productType])" :key="productSubCategory">
					<!-- Only If there are products under the sub category -->
					<div v-if="filteredProducts[productType][productSubCategory].length > 0">
						<p class="headline font-weight-bold productSubCategory">{{ products[productType][productSubCategory][0].category }}</p>
						<v-layout row wrap class="mt-2 ">
							<!-- Products -->
							<v-flex xs9 sm5 md4 lg3 v-for="product in filteredProducts[productType][productSubCategory]" :key="product.title">
								<Product :product="product" />
							</v-flex>
						</v-layout>
					</div>
				</div>
			</v-container>
		</div>
	</div>
</template>

<script>
import Filters from "../components/Filters";
import Product from "../components/Product";
export default {
	name: "Home",
	components: {
		Filters,
		Product,
	},
	data() {
		return {
			filteredProducts: {},

			products: {
				accounts: {
					savingsAccounts: [
						{
							category: "Savings Account",
							title: "Super Savings",
							interest: 3.9,
							transaction: 5000,
							src: "product 1.jpg",
						},
						{
							category: "Savings Account",
							title: "Silver Savings",
							interest: 4.5,
							transaction: 7000,
							src: "product 2.jpg",
						},
						{ category: "Savings Account", title: "Gold Savings", interest: 5.2, transaction: 9000, src: "product 3.jpg" },
						{ category: "Savings Account", title: "Diamond Savings", interest: 3, transaction: 9000, src: "product 4.jpg" },
						{ category: "Savings Account", title: "Big Gold Savings", interest: 5.2, transaction: 9000, src: "product 5.jpg" },
						{ category: "Savings Account", title: "Big Diamond Savings", interest: 3, transaction: 9000, src: "product 6.jpg" },
					],
				},

				deposits: {
					fixedDeposits: [
						{
							category: "Fixed Deposits",
							title: "Silver Fixed Deposits",
							term: 3,
							interest: 7.2,
							minTransaction: 5000,
							maxTransaction: 50000,
							src: "product 7.jpg",
						},
						{
							category: "Fixed Deposits",
							title: "Gold Fixed Deposits",
							term: 3,
							interest: 7.2,
							minTransaction: 5000,
							maxTransaction: 50000,
							src: "product 8.jpg",
						},
						{
							category: "Fixed Deposits",
							title: "Platinum Fixed Deposits",
							term: 3,
							interest: 7.2,
							minTransaction: 5000,
							maxTransaction: 50000,
							src: "product 9.jpg",
						},
						{
							category: "Fixed Deposits",
							title: "Diamond Fixed Deposits",
							term: 3,
							interest: 7.3,
							minTransaction: 5000,
							maxTransaction: 50000,
							src: "product 10.jpg",
						},
					],
				},
			},
		};
	},
	beforeMount() {
		this.searchedProducts = { ...this.products };
		this.filteredProducts = { ...this.products };
	},
	methods: {
		parentUpdateFilteredProducts(updatedFilteredProducts) {
			this.filteredProducts = { ...updatedFilteredProducts };
		},

		areNoProductsFound() {
			return Object.keys(this.filteredProducts).every(
				(category) =>
					Object.keys(this.filteredProducts[category]).every((subCategory) => this.filteredProducts[category][subCategory].length == 0) == true
			);
			// return temp.length == 0;
		},
	},
};
</script>

<style scoped>
.productSubCategory {
	color: #999999;
}

@media only screen and (min-width: 700px) {
	.noProductsFound {
		margin-top: 120px;
	}
}

@media only screen and (max-width: 699px) {
	.noProductsFound {
		margin-top: 50px;
	}
}
</style>
