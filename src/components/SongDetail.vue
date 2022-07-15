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
			<v-text-field label="Associated File Name. (Can be any length -- used for score and sound file names.)" v-model="songObject.NOTATION_FILE_NAME" ></v-text-field>
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
		<v-btn v-if="editMode" color="green">Save Basic Song Edits</v-btn>
	</v-row>
	<v-container v-if="editMode">
		<v-card style="margin-top: 10px;">
			<v-tabs>
				<v-tab style="font-size: large" ripple key="1" >Musical Analysis</v-tab>
				<v-tab style="font-size: large" ripple key="2" >Rhythms</v-tab>
				<v-tab style="font-size: large" ripple key="3" @click="pedagogyClick" >Melodic Cont.</v-tab>
				<v-tab style="font-size: large" ripple key="4" @click="rhythmClick" >Rhythmic Cont.</v-tab>
			<v-tab-item key="1">
				<v-layout row>
				<v-col md3 style="margin-left: 10px;">
					<v-select
							v-model="songObject.TONALCENTERID"
							label="Tonal Center"
							:items="notesArray"
							item-text="LABEL"
							item-value="DATA"
							return-object
					></v-select>
				</v-col>
				<v-col md3 style="margin-left: 10px;">
					<v-select
							v-model="songObject.RANGEID"
							label="Range"
							:items="rangeArray"
							item-text="LABEL"
							item-value="DATA"
							return-object
					></v-select>
				</v-col>
					<v-col md3 style="margin-left: 10px;">
						<v-select
								v-model="songObject.SCALEID"
								label="Scale"
								:items="scaleArray"
								item-text="LABEL"
								item-value="DATA"
								return-object
						></v-select>
					</v-col>
				</v-layout>
				<v-layout row>
					<v-col md3 style="margin-left: 10px;">
						<v-text-field v-model="songObject.TONESETID" label="Toneset"></v-text-field>
					</v-col>
					<v-col md3 style="margin-left: 10px;">
						<v-select
								v-model="songObject.STARTING_PITCHID"
								label="Starting Pitch"
								:items="startingPitchArray"
								item-text="LABEL"
								item-value="DATA"
								return-object
						></v-select>
					</v-col>
					<v-col md3 style="margin-left: 10px;">
						<v-select
								v-model="songObject.FORMTYPEID"
								label="Form Type"
								:items="formTypesArray"
								item-text="LABEL"
								item-value="DATA"
								return-object
						></v-select>
					</v-col>
				</v-layout>
				<v-layout row>
					<v-col md3 style="margin-left: 10px;">
						<v-select
								v-model="songObject.METERID"
								label="Meter"
								:items="metersArray"
								item-text="LABEL"
								item-value="DATA"
								return-object
						></v-select>
					</v-col>
					<v-col md3 style="margin-left: 10px;">
						<v-select
								v-model="songObject.FORMID"
								label="Formal Analysis"
								:items="formArray"
								item-text="LABEL"
								item-value="DATA"
								return-object
						></v-select>
					</v-col>
					<v-col md3 style="margin-left: 10px;">
						<v-text-field v-model="songObject.FORMANALYSISSTR" label="Form Analysis String"></v-text-field>
					</v-col>
				</v-layout>
				<v-layout>
					<v-row class="justify-center" >
						<v-btn class="justify-center" style="margin-bottom: 30px;" v-if="editMode" color="blue">Save Musical Analysis Edits</v-btn>
					</v-row>
				</v-layout>
			</v-tab-item>
				<v-tab-item key="2">
					<v-layout row>
						<v-simple-table>
							<tbody>
							<tr>
								<td><v-img src="../assets/ta.gif" max-height="40%" max-width="60%" ></v-img> </td>
								<td style="font-size: 20px">ta</td>
								<td><v-checkbox v-model="songObject.TA"></v-checkbox></td>
						
								<td><v-img src="../assets/tiri_tiri.gif" max-height="40" max-width="60" ></v-img> </td>
								<td style="font-size: 20px">tiri-tiri</td>
								<td><v-checkbox v-model="songObject.TIRI_TIRI"></v-checkbox></td>
								
								<td><v-img src="../assets/tiri.gif" max-height="55%" max-width="65%" ></v-img> </td>
								<td style="font-size: 20px">tiri</td>
								<td><v-checkbox v-model="songObject.TIRI"></v-checkbox></td>
								
								<td><v-img src="../assets/ti_ti_ti.gif" max-height="40" max-width="60" ></v-img> </td>
								<td style="font-size: 20px">ti-ti-ti</td>
								<td><v-checkbox v-model="songObject.TI_TI_TI"></v-checkbox></td>
							
							</tr>
							<tr>
								<td><v-img src="../assets/ti-ti.gif" max-height="40" max-width="60" ></v-img> </td>
								<td style="font-size: 20px">ti-ti</td>
								<td><v-checkbox v-model="songObject.TI_TI"></v-checkbox></td>
								
								<td><v-img src="../assets/ti-tiri.gif" max-height="40" max-width="60" ></v-img> </td>
								<td style="font-size: 20px">ti-tiri</td>
								<td><v-checkbox v-model="songObject.TI_TIRI"></v-checkbox></td>
								
								<td><v-img src="../assets/tim-ri.gif" max-height="40" max-width="60" ></v-img> </td>
								<td style="font-size: 20px">tim-ri</td>
								<td><v-checkbox v-model="songObject.TIM_RI"></v-checkbox></td>
								
								<td><v-img src="../assets/ta_ti.gif" max-height="40" max-width="60" ></v-img> </td>
								<td style="font-size: 20px">ta-ti</td>
								<td><v-checkbox v-model="songObject.TA_TI"></v-checkbox></td>
							</tr>
							<tr>
								<td><v-img src="../assets/rest.gif" max-height="50%" max-width="58%" ></v-img> </td>
								<td style="font-size: 20px">rest</td>
								<td><v-checkbox v-model="songObject.REST"></v-checkbox></td>
								
								<td><v-img src="../assets/tiri_ti.gif" max-height="40" max-width="60" ></v-img> </td>
								<td style="font-size: 20px">tiri-ti</td>
								<td><v-checkbox v-model="songObject.TIRI_TI"></v-checkbox></td>
								
								<td><v-img src="../assets/ri_ti_ri.gif" max-height="40" max-width="60" ></v-img> </td>
								<td style="font-size: 20px">ri-ti-ri</td>
								<td><v-checkbox v-model="songObject.RI_TIM_RI"></v-checkbox></td>
								
								<td><v-img src="../assets/ti_ta.gif" max-height="50%" max-width="75%" ></v-img> </td>
								<td style="font-size: 20px">ti-ta</td>
								<td><v-checkbox v-model="songObject.TI_TA"></v-checkbox></td>
							</tr>
							<tr>
								<td><v-img src="../assets/ta_a.gif" max-height="40%" max-width="60%" ></v-img> </td>
								<td style="font-size: 20px">ta-a</td>
								<td><v-checkbox v-model="songObject.TA_A"></v-checkbox></td>
								
								<td><v-img src="../assets/syn_co_pa.gif" max-height="58%" max-width="83%" ></v-img> </td>
								<td style="font-size: 20px">syn-co-pa</td>
								<td><v-checkbox v-model="songObject.TI_TA_TI"></v-checkbox></td>
								
								<td><v-img src="../assets/ri.gif" max-height="55%" max-width="44%" ></v-img> </td>
								<td style="font-size: 20px">ri</td>
								<td><v-checkbox v-model="songObject.RI"></v-checkbox></td>
								
								<td><v-img src="../assets/tim_ri_ti.gif" max-height="40" max-width="60" ></v-img> </td>
								<td style="font-size: 20px">tim-ri-ti</td>
								<td><v-checkbox v-model="songObject.TIM_RI_TI"></v-checkbox></td>
							
							</tr>
							
							<tr>
								<td><v-img src="../assets/half_rest.gif" max-height="40%" max-width="60%" ></v-img> </td>
								<td style="font-size: 20px">half rest</td>
								<td><v-checkbox v-model="songObject.HALF_REST"></v-checkbox></td>
								
								<td><v-img src="../assets/tai_ti.gif" max-height="40" max-width="60" ></v-img> </td>
								<td style="font-size: 20px">tai-ti</td>
								<td><v-checkbox v-model="songObject.TA_TI"></v-checkbox></td>
								
								<td><v-img src="../assets/tim.gif" max-height="55%" max-width="44%" ></v-img> </td>
								<td style="font-size: 20px">tim</td>
								<td><v-checkbox v-model="songObject.TIM"></v-checkbox></td>
								
								<td><v-img src="../assets/ri_tim_ti.gif" max-height="40" max-width="60" ></v-img> </td>
								<td style="font-size: 20px">ri-tim-ri</td>
								<td><v-checkbox v-model="songObject.RI_TIM_RI"></v-checkbox></td>
							
							</tr>
							
							<tr>
								<td><v-img src="../assets/ta-a-a.gif" max-height="40%" max-width="60%" ></v-img> </td>
								<td style="font-size: 20px">ta-a-a</td>
								<td><v-checkbox v-model="songObject.TA_A_A"></v-checkbox></td>
								
								<td><v-img src="../assets/ti_tai.gif" max-height="40" max-width="60" ></v-img> </td>
								<td style="font-size: 20px">ti-tai</td>
								<td><v-checkbox v-model="songObject.TI_TAI"></v-checkbox></td>
								
								<td><v-img src="../assets/ri_tim.gif" max-height="55%" max-width="64%" ></v-img> </td>
								<td style="font-size: 20px">ri-tim</td>
								<td><v-checkbox v-model="songObject.RI_TIM"></v-checkbox></td>
								
								<td><v-img src="../assets/ti_tim_ri.gif" max-height="40" max-width="60" ></v-img> </td>
								<td style="font-size: 20px">ti-tim-ri</td>
								<td><v-checkbox v-model="songObject.TI_TIM_RI"></v-checkbox></td>
							
							</tr>
							
							<tr>
								<td><v-img src="../assets/ta-a-a-a.gif" max-height="40%" max-width="60%" ></v-img> </td>
								<td style="font-size: 20px">ta-a-a-a</td>
								<td><v-checkbox v-model="songObject.TA_A_A_A"></v-checkbox></td>
								
								<td><v-img src="../assets/eighth_rest.gif" max-height="67%" max-width="51%" ></v-img> </td>
								<td style="font-size: 20px">eighth rest</td>
								<td><v-checkbox v-model="songObject.EIGHTH_REST"></v-checkbox></td>
								
								<td><v-img src="../assets/tri_o_la.gif" max-height="55%" max-width="107%" ></v-img> </td>
								<td style="font-size: 20px">tri-o-la</td>
								<td><v-checkbox v-model="songObject.TRI_O_LA"></v-checkbox></td>
								
								<td><v-img src="../assets/anacrusis.gif" max-height="40" max-width="60" ></v-img> </td>
								<td style="font-size: 20px">anacrusis</td>
								<td><v-checkbox v-model="songObject.ANAC"></v-checkbox></td>
							</tr>
							
							<tr>
								<td><v-img src="../assets/whole_rest.gif" max-height="40%" max-width="60%" ></v-img> </td>
								<td style="font-size: 20px">whole rest</td>
								<td><v-checkbox v-model="songObject.WHOLE_REST"></v-checkbox></td>
								
								<td><v-img src="../assets/ti.gif" max-height="67%" max-width="36%" ></v-img> </td>
								<td style="font-size: 20px">ti</td>
								<td><v-checkbox v-model="songObject.TI"></v-checkbox></td>
								
								<td><v-img src="../assets/tai.gif" max-height="62%" max-width="74%" ></v-img> </td>
								<td style="font-size: 20px">tai</td>
								<td><v-checkbox v-model="songObject.TAI"></v-checkbox></td>
								
								<td><v-img src="../assets/tie.gif" max-height="40" max-width="60" ></v-img> </td>
								<td style="font-size: 20px">tie</td>
								<td><v-checkbox v-model="songObject.TIE"></v-checkbox></td>
							</tr>
							
<!--							<tr>-->
<!--								<td><v-img src="../assets/other.gif" max-height="40%" max-width="60%" ></v-img> </td>-->
<!--								<td style="font-size: 20px">other</td>-->
<!--								<td><v-checkbox v-model="songObject.OTHER"></v-checkbox></td>-->
<!--							</tr>-->
							</tbody>
						</v-simple-table>
					</v-layout>
					<v-layout>
						<v-row class="justify-center" >
							<v-btn class="justify-center" style="margin-top: 30px; margin-bottom: 20px;"  v-if="editMode" color="green">Save Rythmic Edits</v-btn>
						</v-row>
					</v-layout>
				</v-tab-item>
				<v-tab-item key="3">
					<v-layout row>
						<v-col md1 style="max-width: fit-content">
							<v-btn color="red" style="margin: 10px;">Delete Selected</v-btn>
							<br />
							<v-btn color="blue" style="margin: 10px;" @click="setMelContextAddMode">Add New Mel Element</v-btn>
							</v-col>
						<v-col md8>
							<v-simple-table>
								<tbody>
								<tr>
									<td>Melodic Element</td>
									<td>Melodic Context</td>
									<td>Preparation</td>
									<td>Practice</td>
									<td>Tuning Up</td>
									<td>Older</td>
								</tr>
								<tr
										v-for="item in songMelodicElementsArrays"
										:key="item.ID"
										@click="handleMelodicClick(item.ID)"
								>
									<td>{{ item.TONEABBREVIATION }}</td>
									<td>{{ item.CONTEXTNAME}}</td>
									<td><v-checkbox v-model="item.MPREPARATION"></v-checkbox></td>
									<td><v-checkbox v-model="item.MEARLYPRACTICE"></v-checkbox></td>
									<td><v-checkbox v-model="item.MMIDDLEPRACTICE"></v-checkbox></td>
									<td><v-checkbox v-model="item.MLATEPRACTICE"></v-checkbox></td>
								</tr>
								</tbody>
							</v-simple-table>
						</v-col>
					</v-layout>
					<v-layout row v-if="editMelContextMode">
						<v-col md2 style="margin-left: 10px;">
							<v-select
									v-model="songMelodicContextObject.MELODICELEMENTKEY"
									label="Melodic Element"
									:items="melodicElementsArray"
									item-text="LABEL"
									item-value="DATA"
									@change="getCorrectContext()"
									return-object
							></v-select>
						</v-col>
						<v-col md2>
							<v-select
									v-model="songMelodicContextObject.MELODICCONTEXTKEY"
									label="Melodic Context"
									:items="availableMelContextsArray"
									item-text="LABEL"
									item-value="DATA"
									@change="selectMelodicContext()"
									return-object
							></v-select>
						</v-col>
						<v-col md2>
							<v-checkbox v-model="songMelodicContextObject.MPREPARATION" label="Prep."></v-checkbox>
						</v-col>
						<v-col md2>
							<v-checkbox v-model="songMelodicContextObject.MEARLYPRACTICE" label="Practice"></v-checkbox>
						</v-col>
						<v-col md2>
							<v-checkbox v-model="songMelodicContextObject.MMIDDLEPRACTICE" label="Tuning"></v-checkbox>
						</v-col>
						<v-col md2>
							<v-checkbox v-model="songMelodicContextObject.MLATEPRACTICE" label="Older"></v-checkbox>
						</v-col>
					</v-layout>
					<v-layout row v-if="addMelContextMode">
						<v-col md2 style="margin-left: 10px;">
							<v-select
									v-model="songMelodicContextObject.MELODICELEMENTKEY"
									label="Melodic Element"
									:items="melodicElementsArray"
									item-text="LABEL"
									item-value="DATA"
									@change="getCorrectContext()"
									return-object
							></v-select>
						</v-col>
						<v-col md2>
							<v-select
									v-model="songMelodicContextObject.MELODICCONTEXTKEY"
									label="Melodic Context"
									:items="availableMelContextsArray"
									item-text="LABEL"
									item-value="DATA"
									@change="selectMelodicContext()"
									return-object
							></v-select>
						</v-col>
						<v-col md2>
							<v-checkbox v-model="songMelodicContextObject.MPREPARATION" label="Prep."></v-checkbox>
						</v-col>
						<v-col md2>
							<v-checkbox v-model="songMelodicContextObject.MEARLYPRACTICE" label="Practice"></v-checkbox>
						</v-col>
						<v-col md2>
							<v-checkbox v-model="songMelodicContextObject.MMIDDLEPRACTICE" label="Tuning"></v-checkbox>
						</v-col>
						<v-col md2>
							<v-checkbox v-model="songMelodicContextObject.MLATEPRACTICE" label="Older"></v-checkbox>
						</v-col>
					</v-layout>
					<v-row class="justify-center">
						<v-btn v-if="editMelContextMode" @click="saveMelContextEdits" color="green" style="margin-bottom: 20px;">Save Mel. Context Edits</v-btn>
						<v-btn v-if="editMelContextMode" @click="saveMelContextEdits" color="red" style="margin-bottom: 20px; margin-left: 10px;">Delete This Melodic Context </v-btn>
						<v-btn v-if="addMelContextMode" @click="saveMelContextEdits" color="green" style="margin-bottom: 20px;">Save New Melodic Context</v-btn>
					</v-row>
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
		melodicElementsArray:[],
		songMelodicElementsArrays:[],
		availableMelContextsArray:[],
		songID:'',
		editMode:false,
		addMode:false,
		statesArray:[],
		regionsArray:[],
		ethnicityArray:[],
		notesArray:[],
		rangeArray:[],
		scaleArray:[],
		startingPitchArray:[],
		formTypesArray:[],
		metersArray:[],
		formArray:[],
		addMelContextMode:false,
		editMelContextMode:false,
		songMelodicContextArray:[],
		songMelodicContextObject:{},
		editorConfig:{
		
		},
		editor: ClassicEditor,
		editorData: '',
	}),
	methods:{
		
		rhythmClick(){
		
		},
		
		
		setMelContextAddMode(){
			this.editMelContextMode = false;
			this.addMelContextMode= true;
			this.clearMelContextObject();
		},
		
		clearMelContextObject(){
			let vm=this;
			
			vm.songMelodicContextObject.MELODICCONTEXTKEY = 0;
			vm.songMelodicContextObject.MELODICELEMENTKEY = 0;
			vm.songMelodicContextObject.MPREPARATION = 0;
			vm.songMelodicContextObject.MEARLYPRACTICE = 0
			vm.songMelodicContextObject.MMIDDLEPRACTICE = 0
			vm.songMelodicContextObject.MLATEPRACTICE = 0;
			
		},
		
		saveMelContextEdits(){
			let vm=this;
			vm.editMelContextMode = false;
		},
		
		selectMelodicContext(){
			let vm=this;
			vm.songMelodicContextObject.MELODICCONTEXTKEY = vm.songMelodicContextObject.MELODICCONTEXTKEY.DATA;
		},
		
		getCorrectContext(){
			let vm=this;
			console.log(vm.songMelodicContextObject.MELODICCONTEXTKEY.DATA);
			axios.get(vm.dataURL+ 'method=getMelContextsForElement&element=' + vm.songMelodicContextObject.MELODICELEMENTKEY.DATA)
						.then(function (result){
							vm.availableMelContextsArray = result.data.results;
						})
		},
		
		
		getCorrectContextOnLoad(){
			let vm=this;
			console.log(vm.songMelodicContextObject.MELODICCONTEXTKEY);
			axios.get(vm.dataURL+ 'method=getMelContextsForElement&element=' + vm.songMelodicContextObject.MELODICELEMENTKEY)
					.then(function (result){
						vm.availableMelContextsArray = result.data.results;
					})
		},
		
		handleMelodicClick(id){
			let vm=this;
			
			axios.get(vm.dataURL + 'method=getMelodicContectRecord&melContextRecord=' + id)
					.then(function (result){
						vm.songMelodicContextArray = result.data.results;
						vm.songMelodicContextObject = vm.songMelodicContextArray[0];
						vm.getCorrectContextOnLoad();
						vm.editMelContextMode = true;
						vm.addMelContextMode = false;
					})
		},
		
		pedagogyClick(){
			let vm=this;
			axios.get(vm.dataURL+'method=getMelodicElements')
					.then(function (result){
						vm.melodicElementsArray = result.data.results;
					})
			axios.get(vm.dataURL + 'method=getMelodicContextsForSong&titleKey=' + vm.songID )
					.then(function (result){
						vm.songMelodicElementsArrays = result.data.results;
					})
			// vm.getCorrectContextOnLoad();
		},
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
		},
		getRanges(){
			let vm=this;
			axios.get(vm.dataURL + 'method=getRange')
					.then(function (result){
						vm.rangeArray = result.data.results;
					})
		} ,
		getScales(){
			let vm=this;
			axios.get(vm.dataURL + 'method=getScales')
					.then(function (result){
						vm.scaleArray = result.data.results;
					})
		},
		getStartingPitches(){
			let vm=this;
			axios.get(vm.dataURL + 'method=getStartingPitch')
					.then(function (result){
						vm.startingPitchArray = result.data.results;
					})
		},
		getFormTypes(){
			let vm=this;
			axios.get(vm.dataURL + 'method=getFormTypes')
					.then(function (results){
						vm.formTypesArray = results.data.results;
					})
		},
		getForms(){
			let vm=this;
			axios.get(vm.dataURL + 'method=getForms')
					.then(function (result){
						vm.formArray = result.data.results;
					})
		},
		getMeters(){
			let vm=this;
			axios.get(vm.dataURL + 'method=getMeters')
					.then(function (results){
						vm.metersArray = results.data.results;
					})
		}
	},
	created() {
		this.songID =  this.$route.params.id;
		this.getStates();
		this.getRegions();
		this.getEthnicities();
		this.getTonalCenters();
		this.getRanges();
		this.getScales();
		this.getStartingPitches();
		this.getFormTypes();
		this.getMeters();
		this.getForms();
		if (this.songID > 0){
			this.getSongDetails(this.songID);
			this.editMode=true;
			this.addMode=false;
		}
	}
}
</script>

<style scoped>
hr {
	transform: rotate(90deg);
}
</style>
