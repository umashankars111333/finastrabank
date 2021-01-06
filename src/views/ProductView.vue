<template>
	<div>
		<v-card class="text-center py-5 mb-6" color="#F7F9F9">
			<v-card-text class="text-h4 text-capitalize">
				<div style="color : #106454">{{ productObject.title }}</div>
			</v-card-text>
		</v-card>

		<v-card class="mx-auto" height="500px">
			<v-img class="white--text align-end" height="350px" :src="require('../assets/' + productObject.src)"> </v-img>
			<v-card-title>{{ productObject.title }}</v-card-title>

			<v-card-text class="text--primary">
				<v-chip v-show="productObject.term" class="ma-2 rounded-lg" color="rgba(17, 122, 101, 0.15)">
					<v-icon small left class="ml-0 mr-1">
						mdi-calendar-clock
					</v-icon>
					<span class="font-weight-bold mr-2">Term </span>
					<span class="text-body-1">{{ productObject.term }} Years</span>
				</v-chip>

				<v-chip left class="ma-2 rounded-lg" color="rgba(17, 122, 101,0.15)" text-color="black">
					<span class="font-weight-black mr-2" text-color="black">ROI</span>
					<span class="text-body-1">{{ Math.round(productObject.interest).toFixed(1) }}%</span>
				</v-chip>

				<v-chip v-show="productObject.transaction" large class="ma-2 rounded-lg" color="rgba(17, 122, 101,0.15)">
					<v-icon small left class="ml-0 mr-1" text-color="black">
						fas fa-coins
					</v-icon>

					<div>
						<div>
							<span class="mx-1 text-caption font-weight-bold">Max transaction / day</span>
						</div>
						<div>
							<span class="mx-1" text-color="black">{{ productObject.transaction }} GBP</span>
						</div>
					</div>
				</v-chip>

				<v-chip v-show="productObject.minTransaction" large class="ma-2 rounded-lg" color="rgba(17, 122, 101,0.15)" text-color="black">
					<v-icon small left class="ml-0 mr-1">
						fas fa-pound-sign
					</v-icon>

					<div>
						<div>
							<span class="mx-1 text-caption font-weight-bold">Min-Max amount</span>
						</div>
						<div>
							<span class="mx-1">{{ productObject.minTransaction }} - {{ productObject.maxTransaction }} GBP</span>
						</div>
					</div>
				</v-chip>
			</v-card-text>
		</v-card>
	</div>
</template>

<script>
export default {
	name: "ProductView",
	props: ["productObject"],
};
</script>
