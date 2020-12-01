import React, { Component } from 'react';
import {Table } from 'reactstrap';
import styles from './TableState.module.css';

import CountUp from 'react-countup';

class TableState extends Component {
	constructor(props) {
	super(props)
	this.state={
	data:[]
	}
	}

	/*async componentDidMount(){
	const data = await fetchStateData(this.props.country);
	console.log(data);
	this.setState({data:data.data});
	}*/

	render() {
	if(this.props.data.provinceState==null) {
	this.props.data.provinceState = this.props.country;
	}
	return(
		<Table>
		<thead className="text-left">
		<tr>
		<th>State</th>
		<th>Confirmed</th>
		<th>Active</th>
		<th>Recovered</th>
		<th>Deaths</th>
		</tr>
		</thead>
		<tbody>
			{this.props.data.map((data,key)=> {
			return <tr className="text-left">
			<td>{data.provinceState?data.provinceState:this.props.country}</td>
			<td><CountUp start={0} end={data.confirmed} separator="," duration={1} /></td>
			<td><CountUp start={0} end={data.active} separator="," duration={1} /></td>
			<td><CountUp start={0} end={data.recovered} separator="," duration={1} /></td>
			<td><CountUp start={0} end={data.deaths} separator="," duration={1} /></td>
			</tr>
			})}
		</tbody>
		</Table>
	)
	}

}

export default TableState;