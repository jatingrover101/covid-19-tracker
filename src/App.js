import React from 'react';

import { Cards, Chart, CountryPicker, TableState } from './components';
import styles from './App.module.css';
import { fetchData, fetchStateData } from './api';
import coronaImage from './images/image.png';

class App extends React.Component {
	state ={
		data: [],
		country: '',
		stateData:[]
	
	}

	async componentDidMount() {
		const fetchedData = await fetchData();
		this.setState({data: fetchedData});
	}
	
	handleCountryChange = async (country) => {
		const fetchedData = await fetchData(country);
		this.setState({ data: fetchedData, country: country });
		const data = await fetchStateData(country);
		this.setState({stateData:data.data});
	
		

	}
	
	render() {
		const { data, country } = this.state;

		return (
				<div className={styles.container}>
				<img classname={styles.image} src={coronaImage} alt="COVID-19"/>
					<Cards data={data} />
					<CountryPicker handleCountryChange={this.handleCountryChange}/>
					 <TableState country={this.state.country} data={this.state.stateData} />
					<Chart data={data} country={country}/>

			</div>
			)
	}
}

export default App;