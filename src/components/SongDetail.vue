<template>
<v-container>
	<v-card>
		<v-card-title class="justify-center">
			{{ songObject.TITLE}}
		</v-card-title>
	</v-card>
	<v-row style="margin-top: 20px;">
		<v-col md8 sm12>
			<v-text-field v-model="songObject.TITLE" label="Main Title"></v-text-field>
			<v-text-field v-model="songObject.ALT_TITLE_1" label="Alt. Title 1"></v-text-field>
			<v-text-field v-model="songObject.ALT_TITLE_2" label="Alt. Title 2"></v-text-field>
		</v-col>
		<v-col md4 sm12>
			<v-row>
				<v-col md2>
					<v-checkbox label="Publish" v-model="songObject.PUBLISH"></v-checkbox>
					<v-checkbox label="Notated" v-model="songObject.INFINALE"></v-checkbox>
					<v-checkbox label="Game" v-model="songObject.GAME"></v-checkbox>
				</v-col>
				<v-col md2>
					<v-checkbox label="IP" v-model="songObject.IP_STATUS"></v-checkbox>
					<v-checkbox label="LOC" v-model="songObject.LOC"></v-checkbox>
					<v-checkbox label="Child" v-model="songObject.CHILD"></v-checkbox>
				</v-col>
			</v-row>
		</v-col>
	</v-row>
	<v-row>
		<v-col md6 sm12>
			<v-text-field label="Informant" v-model="songObject.INFORMANT" ></v-text-field>
			<v-text-field label="First Line" v-model="songObject.FIRST_LINE_TEXT" ></v-text-field>
			<v-text-field label="Associated File Name. (Can be any length)" v-model="songObject.NOTATION_FILE_NAME" ></v-text-field>
		</v-col>
		<v-col md6 sm12>
			<v-select
					v-model="songObject.STATEID"
					label="State"
					:items="statesArray"
					item-text="LABEL"
					item-value="DATA"
					return-object
			></v-select>
			<v-select
					v-model="songObject.REGIONID"
					label="Region"
					:items="regionsArray"
					item-text="LABEL"
					item-value="DATA"
					return-object
			></v-select>
			<v-select
					v-model="songObject.ETHNICITYID"
					label="Ethnicity"
					:items="ethnicityArray"
					item-text="LABEL"
					item-value="DATA"
					return-object
			></v-select>
		</v-col>
	</v-row>
	<v-row>
		<v-col md6 sm12>
			<v-text-field disabled label="Source"></v-text-field>
			<ckeditor :editor="editor" v-model="songObject.PUBLICATION" :config="editorConfig"></ckeditor>
			<v-text-field disabled label="General Comments"></v-text-field>
			<ckeditor :editor="editor" v-model="songObject.COMMENTS" :config="editorConfig"></ckeditor>
			<v-text-field disabled label="Song Backgroound"></v-text-field>
			<ckeditor :editor="editor" v-model="songObject.SONG_BACKGROUND" :config="editorConfig"></ckeditor>
		</v-col>
	</v-row>
	<v-row class="justify-center">
		<v-btn v-if="editMode" color="green">Save Edits</v-btn>
	</v-row>
	<v-container v-if="editMode">
		<v-card style="margin-top: 10px;">
			<v-tabs>
				<v-tab style="font-size: large" ripple key="1" >Musical Analysis</v-tab>
			
			<v-tab-item key="1">
				<v-col md4 style="margin-left: 10px;">
					<v-select
							v-model="songObject.TONALCENTERID"
							label="Tonal Center"
							:items="notesArray"
							item-text="LABEL"
							item-value="DATA"
							return-object
					></v-select>
				</v-col>
			</v-tab-item>
			</v-tabs>
		</v-card>
	</v-container>
</v-container>
</template>

<script>
import axios from "axios";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default {
	
	name: "SongDetail",
	data: () => ({
		dataURL: "https://kodaly.hnu.edu/kodalyVue/kodalyVue.cfc?",
		songArray:[],
		songObject:{},
		songID:'',
		editMode:false,
		addMode:false,
		statesArray:[],
		regionsArray:[],
		ethnicityArray:[],
		notesArray:[],
		editorConfig:{
		
		},
		editor: ClassicEditor,
		editorData: '',
	}),
	methods:{
		getSongDetails(id){
			let vm=this;
			axios.get(vm.dataURL+'method=getSongDetails&songID=' + id)
					.then(function (result){
						vm.songArray = result.data.results;
						vm.songObject = vm.songArray[0];
					})
			},
		getStates(){
			let vm=this;
			axios.get(vm.dataURL+'method=getStates')
					.then(function (result){
						vm.statesArray = result.data.results;
					})
		},
		getRegions(){
			let vm=this;
			axios.get(vm.dataURL+'method=getRegions')
					.then(function (result){
						vm.regionsArray = result.data.results;
					})
		},
		getEthnicities(){
			let vm=this;
			axios.get(vm.dataURL+'method=getEthnicities')
					.then(function (result){
						vm.ethnicityArray = result.data.results;
					})
		},
		getTonalCenters(){
			let vm=this;
			axios.get(vm.dataURL+'method=getNotes')
					.then(function (result){
						vm.notesArray = result.data.results;
					})
		}
	},
	created() {
		this.songID =  this.$route.params.id;
		this.getStates();
		this.getRegions();
		this.getEthnicities();
		this.getTonalCenters();
		if (this.songID > 0){
			this.getSongDetails(this.songID);
			this.editMode=true;
			this.addMode=false;
		}
	}
}
</script>

<style scoped>

</style>
