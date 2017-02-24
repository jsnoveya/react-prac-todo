/* reference source */
// https://facebook.github.io/react/docs/forms.html

/* end reference source */

import React from 'react';

class InputField extends React.Component {
	render() {
		return (
			<input
				placeholder="pls key in your todo item"
				value={this.props.value}
				onChange={(e)=>this.props.onClick(e)}
				autoFocus
			 />
		)
	}
}

class INPUT extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange=this.handleChange.bind(this);
		this.state={
			value: '',
		}
	}
	handleChange(e) {
		this.setState({
			value: e.target.value,
		})
	}
	render() {
		return (
			<div>
				<InputField
					value={this.state.value}
					onClick={this.handleChange}
				 />
				<button onClick={()=>this.props.onClick(this.state.value)}>add</button>
			</div>
		)
	}
}

class OUTPUT extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		const todos=this.props.todos;
		const showlist=todos.map((item,idx)=>{
			return (
				<li key={idx+1}>
					{item}
					<button onClick={()=>this.props.onClick(idx)}>del</button>
				</li>
			)
		});
		return (
			<ol>
				{showlist}
			</ol>
		)
	}
}

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state={
    	todos:['aaa','bbbb'],
    }
  }

  addTodo(val){
  	let todos=this.state.todos.slice();
  	let isExisted=todos.find((el)=>el===val);
  	if (isExisted)	return alert('Duplicate item! pls key in another item...');
  	todos.push(val);
  	this.setState({
  		todos:todos,
  	});
  }
  delTodo(idx){
  	let todos=this.state.todos.slice();
  	todos.splice(idx,1);
  	this.setState({
  		todos:todos,
  	})
  }

  render() {
  	const count_num=this.state.todos.length;
    return (
      <div>
      	<h1>TODO： {count_num} 件</h1>
      	<INPUT onClick={(val)=>this.addTodo(val)} />
      	<OUTPUT onClick={(idx)=>this.delTodo(idx)}todos={this.state.todos} />
      </div>
    );
  }
};
