<template>
<v-container>
	<v-card>
		<v-card-title class="justify-center">
			All Songs
		</v-card-title>
	</v-card>
	<v-row>
		<v-container grid-list-md >
			<v-data-table
					:headers="headers"
					:items="songsArray"
					:items-per-page="800"
					class="elevation-1"
					@click:row="handleClick"
					:dense="true"
					:search="search"
					:custom-filter="filterOnlyCapsText">
				<template v-slot:top>
					<v-text-field
							v-model="search"
							label="Search (UPPER CASE ONLY)"
							class="mx-4"
					></v-text-field>
				</template>
			</v-data-table>
		</v-container>
	</v-row>
</v-container>
</template>

<script>
import router from "@/router";
export default {
	name: "SongsHome",
	data() {
		return {
			songsArray:[],
			rowsPerPageItems: [50, 200],
			dataURL: "https://kodaly.hnu.edu/kodalyVue/kodalyVue.cfc?",
			search:'',
			pagination: {
				rowsPerPage: 100,
				itemsPerPage:100,
			},
			headers: [
				{text: "ID", value: "ID", sortable:true},
				{text: "Title", value: "TITLE", sortable:true},
				{text: "Alt. Title", value: "ALT_TITLE_1", sortable:true},
				{text: "First Line", value: "FIRST_LINE_TEXT", sortable:true},
				{text: "File Name", value: "NOTATION_FILE_NAME", sortable:true},
			],
		}
	},
	methods:{
		getSongs(){
			let vm=this;
			vm.axios.get(vm.dataURL + 'method=getSongs')
					.then(function (result){
						vm.songsArray = result.data.results;
					})
			},
		handleClick : function(value){
			// alert(value.ID);
			router.push({ name: "SongDetail", params: { id: value.ID } });
		},
		filterOnlyCapsText (value, search) {
			return value != null &&
					search != null &&
					typeof value === 'string' &&
					value.toString().toLocaleUpperCase().indexOf(search) !== -1
		},
	},
	mounted() {
		this.getSongs();
	}
}
</script>

<style scoped>

</style>
