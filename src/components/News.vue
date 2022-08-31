<template>
	<v-container>
		<v-layout row wrap align-center>
			<v-flex >
				<v-card>
					<v-card-title class="justify-center" >
						NEWS                                                                      \
					</v-card-title>
					<v-card-text class="justify-center" >
						<v-btn @click="addNewsItem">
							Add News Item
						</v-btn>
					</v-card-text>
				</v-card>
			</v-flex>
		</v-layout>
		<v-row>
			<v-container grid-list-md >
				<v-data-table
						:headers="headers"
						:items="newsArray"
						:items-per-page="800"
						class="elevation-1"
						@click:row="handleClick">
					<template v-slot:item.NEWSITEMPOSTSWITCH="{ item }">
						<v-simple-checkbox
								v-model="item.NEWSITEMPOSTSWITCH"
								disabled
						></v-simple-checkbox>
					</template>
				</v-data-table>
			</v-container>
		</v-row>
		<v-row v-if="editMode">
		
		</v-row>
	
	</v-container>
	
</template>

<script>
import axios from "axios";


export default {
	name: "News",
	data() {
		return{
			newsArray:[],
			newsObject:{} ,
			newsItemArray:[],
			picker:'',
			rowsPerPageItems: [50, 200],
			dataURL: "https://kodaly.hnu.edu/kodalyVue/kodalyVue.cfc?",
			search:'',
			pagination: {
				rowsPerPage: 100,
				itemsPerPage:100,
			},
			headers: [
				
				{text: "Title", value: "NEWSITEMHEADLINE", sortable:true},
				{text: "Alt. Title", value: "DATESTRING", sortable:true},
				{text: "Publish", value: "NEWSITEMPOSTSWITCH", sortable:true},
			],
			editMode:false,
			addMode:false
		}
	},
	methods: {
		addNewsItem() {
		
		},
		getNews() {
			let vm = this;
			axios.get(vm.dataURL + 'method=getNewsArray')
					.then(function (result) {
						vm.newsArray = result.data.results;
					})
		},
		handleClick: function (value) {
			// alert(value.ID);
			let vm = this;
			axios.get(vm.dataURL + 'method=getNewsItem&ID=' + value.ID)
					.then(function (result) {
						vm.newsItemArray = result.data.results;
						vm.newsObject = vm.newsItemArray[0];
						vm.picker = vm.newsObject.POSTDATE;
						vm.editMode = true;
					})
		},
	},
	
	mounted() {
		this.getNews();
	}

}
</script>

<style scoped>

</style>
