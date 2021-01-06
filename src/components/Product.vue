<template>
	<v-hover v-slot="{ hover }">
		<v-card text class="ma-3" :elevation="hover ? 10 : 3" :class="{ 'on-hover': hover }" max-width="300px">
			<v-img height="250" :src="require('../assets/' + product.src)">
				<v-fade-transition>
					<div v-if="hover" class="d-flex  darken-2 v-card--reveal display-3 white--text" style="height: 100%; background-color: rgba(0, 0, 0, 0.75)">
						<v-card-actions>
							<v-btn x-large text class="primary large" :to="routeToProduct()" @click="changeCurrentUrl">
								<span class="text-capitalize">Apply Now</span>
								<v-icon small right>fas fa-arrow-circle-right</v-icon>
							</v-btn>
						</v-card-actions>
					</div>
				</v-fade-transition>
			</v-img>

			<v-card-text>
				<div class="text-h6 font-weight-bold black--text text-center mb-3">
					{{ product.title }}
				</div>

				<v-chip v-show="product.term" class="ma-2 rounded-lg" color="rgba(17, 122, 101, 0.15)">
					<v-icon small left class="ml-0 mr-1">
						mdi-calendar-clock
					</v-icon>
					<span class="font-weight-bold mr-2">Term </span>
					<span class="text-body-1">{{ product.term }} Years</span>
				</v-chip>

				<v-chip left class="ma-2 rounded-lg" color="rgba(17, 122, 101,0.15)" text-color="black">
					<span class="font-weight-black mr-2" text-color="black">ROI</span>
					<span class="text-body-1">{{ Math.round(product.interest).toFixed(1) }}%</span>
				</v-chip>

				<v-chip v-show="product.transaction" large class="ma-2 rounded-lg" color="rgba(17, 122, 101,0.15)">
					<v-icon small left class="ml-0 mr-1" text-color="black">
						fas fa-coins
					</v-icon>

					<div>
						<div>
							<span class="mx-1 text-caption font-weight-bold">Max transaction / day</span>
						</div>
						<div>
							<span class="mx-1" text-color="black">{{ product.transaction }} GBP</span>
						</div>
					</div>
				</v-chip>

				<v-chip v-show="product.minTransaction" large class="ma-2 rounded-lg" color="rgba(17, 122, 101,0.15)" text-color="black">
					<v-icon small left class="ml-0 mr-1">
						fas fa-pound-sign
					</v-icon>

					<div>
						<div>
							<span class="mx-1 text-caption font-weight-bold">Min-Max amount</span>
						</div>
						<div>
							<span class="mx-1">{{ product.minTransaction }} - {{ product.maxTransaction }} GBP</span>
						</div>
					</div>
				</v-chip>
			</v-card-text>
		</v-card>
	</v-hover>
</template>

<script>
export default {
	name: "Product",
	props: ["product"],
	data() {
		return {
			productRoute: {},
		};
	},
	methods: {
		changeCurrentUrl() {
			this.currentUrlPath = window.location.pathname;
		},
		routeToProduct() {
			this.productRoute = {
				name: "ProductRoute",
				params: { productTitle: this.product.title.toLowerCase().replace(/\s+/g, ""), productObject: this.product },
			};
			return this.productRoute;
		},
	},
};
</script>

<style>
.v-card--reveal {
	align-items: center;
	bottom: 0;
	justify-content: center;
	position: absolute;
	width: 100%;
}
</style>
