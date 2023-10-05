<script setup>
import { computed, ref, watch, onMounted } from 'vue';
import usersJSON from '@/assets/data/users.json';
const tableData = ref(setData());
const tableFiltered = ref([...tableData.value]);
var viewData = ref(chunkArray(tableData, 6));
const activePage = ref(0);
const searchAge = ref('');
const searchName = ref('');



function setData() {
	return [...usersJSON.users].map(el => ({ ...el, avatar: getRandomImage() }))
}

watch(searchAge, (newValue, oldValue) => {
	const filteredArr = tableData.value.filter(el => String(el.age).toLowerCase().search(newValue.toLowerCase()) !== -1);
	tableFiltered.value = filteredArr;
})
watch(tableFiltered, (newValue, oldValue) => {
	viewData.value = chunkArray({ value: newValue }, 6);
})

watch(searchName, (newValue, oldValue) => {
	const filteredArr = tableData.value.filter(el => el.name.toLowerCase().search(newValue.toLowerCase()) !== -1);
	tableFiltered.value = filteredArr;
})


function getRandomImage(min = 1, max = 10) {
	let randomNum = Math.floor(Math.random() * (max - min + 1) + min);
	let image = new URL(`./assets/images/users/${randomNum}.jpg`, import.meta.url).href;
	return image;
}

const getDate = (date) => {
	let result = '';
	const diff = new Date(Number(`${date}000`));
	let day = String(diff.getDate()).padStart(2, '0');
	let month = String(diff.getMonth()).padStart(2, '0');
	let year = String(diff.getFullYear()).padStart(2, '0');
	let hour = String(diff.getHours()).padStart(2, '0');
	let min = String(diff.getMinutes()).padStart(2, '0');

	result = `${year}.${month}.${day} ${hour}:${min}`;

	return result;
}


function chunkArray(proxyArr, size) {
	let array = JSON.parse(JSON.stringify(proxyArr.value));

	let subarray = []; //массив в который будет выведен результат.
	for (let i = 0; i < Math.ceil(array.length / size); i++) {
		subarray[i] = array.slice((i * size), (i * size) + size);
	}

	return subarray;
}


const changePage = (index = 0) => {

	if (index == 'next' && activePage.value < viewData.value.length - 1) {
		activePage.value = activePage.value + 1;
		return
	}
	if (index == 'prev' && activePage.value > 0) {
		activePage.value = activePage.value - 1;
		return
	}

	if (typeof index === 'number') {
		activePage.value = index;
	}

}

const pagIsActive = (i) => i === activePage.value;



</script>

<template>
	<div class="wrapper">
		<div class="container">

			<h1>Users table</h1>

			<header class="head">
				<div class="head__block">
					<button>ADD USER</button>
					<button>SHARE TABLE</button>
				</div>
				<div class="head__block">
					<input type="text" placeholder="Поиск по имени" v-model="searchName">
					<input type="number" placeholder="Поиск по возрасту" v-model="searchAge">
				</div>
			</header>
			<ul class="table-list">
				<li class="card" v-for="(user, i) in viewData[activePage]" :key="user.id" :data="user">
					<img :src="user.avatar">
					<div class="card__info">
						<h5 data-name="name">{{ user.name }}</h5>
						<p data-name="age">age: {{ user.age }}</p>
						<p data-name="date">last login: {{ getDate(user.last_login) }}</p>
					</div>
				</li>
			</ul>

			<div class="pagination">
				<button @click="changePage('prev')">{{ "<" }}</button>
						<ul class="pagination__list">
							<li v-for="(pag, i) in viewData" :key="i" @click="changePage(i)" :data-active="pagIsActive(i)">
								{{ i +
									1 }}
							</li>
						</ul>
						<button @click="changePage('next')">{{ ">" }}</button>
			</div>
		</div>
	</div>
</template>


<style lang="scss" scoped>
@import "./main.scss";
</style>
