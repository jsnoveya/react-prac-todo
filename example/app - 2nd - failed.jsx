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
				onMouseDown={(e)=>this.props.onMouseDown(e)}
				autoFocus
			 />
		)
	}
}

function Button (props) {
	return (
		<button onClick={()=>props.onClick()}>{props.btnText}</button>
	)
}
class Item extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			isEdit: false,
		}
	}
	handleToggleMode(){
		this.setState({
			isEdit: !this.state.isEdit,
		})
	}
	renderShow(){
		return (
			<span onDoubleClick={()=>this.handleToggleMode()}>{this.props.text}</span>
		)
	}
	renderEdit(){
		return (
			<InputField
			 value={this.props.text}
			 onChange={()=>this.props.onChange()}
			 onBlur={()=>this.handleToggleMode()} />
		)
	}
	render(){
		return (this.state.isEdit)? this.renderEdit(): this.renderShow();
	}
}
class INPUT extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange=this.handleChange.bind(this);
		this.handleMouseDown=this.handleMouseDown.bind(this);
		this.state={
			value: '',
		}
	}
	handleChange(e) {
		this.setState({
			value: e.target.value,
		})
	}
	handleMouseDown(e) {
		if (e.button===2) {
			this.setState({
				value: '',
			})
		}
	}
	render() {
		return (
			<div>
				<InputField
					value={this.state.value}
					onClick={this.handleChange}
					onMouseDown={this.handleMouseDown}
				 />
				<Button
					btnText='add'
					onClick={()=>this.props.onClick(this.state.value)}
				/>
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
					<Item text={item} onChange={()=>this.props.onChange(item, idx)} />
					<Button
						btnText='del'
						onClick={()=>this.props.onClick(idx)}
					/>
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
    	todos:[],
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
  updateTodo(val, idx){
  	let todos=this.state.todos.slice();
  	let isExisted=todos.find((el)=>el===val);
  	if (isExisted)	return alert('Duplicate item! pls key in another item...');
  	todos.splice(idx,1,val);
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
  delAllTodo(){
  	this.setState({
  		todos: [],
  	})
  }

  render() {
  	const count_num=this.state.todos.length;
    return (
      <div>
      	<h1>TODO： {count_num} 件 
      		<Button
				btnText='delAll'
				onClick={()=>this.delAllTodo()}
			/>
      	</h1>
      	<INPUT onClick={(val)=>this.addTodo(val)} />
      	<OUTPUT onClick={(idx)=>this.delTodo(idx)}
      			onChange={(val, idx)=>this.updateTodo(val, idx)}
      			todos={this.state.todos} />
      </div>
    );
  }
};
