import axios from 'axios';

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
	let changeableUrl = url;
	if(country) {
		changeableUrl= `${url}/countries/${country}`;
	}

	try {
		const { data: { confirmed, recovered, deaths, lastUpdate} } = await axios.get(changeableUrl);

		return {
			confirmed,
			recovered,
			deaths,
			lastUpdate,
		};
	}
	catch (error) {
		console.log(error);
	}
}

export const fetchDailyData = async () => {
	try {
		const { data } = await axios.get(`${url}/daily`);
		const modifiedData = data.map((dailyData) => ({
			confirmed: dailyData.confirmed.total,
			deaths: dailyData.deaths.total,
			date: dailyData.reportDate,
		}));

		return modifiedData;
	} catch(error) {

	}
}

export const fetchCountries = async () => {
	try{
		const {data: { countries }} = await axios.get(`${url}/countries`);
		return countries.map((country) => country.name);
	}catch(error) {
		console.log(error);
	}
}

export const fetchStateData = async(countries)=>{
	let stateUrl = `${url}/countries/${countries}/confirmed`
	try{
		const data = await axios.get(stateUrl)
		const stateCase = {
			state: data.data.map((da)=>da.provinceState),
			confirmed: data.data.map((da)=>da.confirmed),
			deaths: data.data.map((da)=>da.deaths),
			recovered: data.data.map((da)=>da.recovered)
		}
		return data
	}catch(err){
		console.log(err)
	}
}