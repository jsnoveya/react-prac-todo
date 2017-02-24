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
				onChange={(e)=>this.props.onChange(e)}
				onMouseDown={(e)=>this.props.onMouseDown(e)}
				onKeyDown={(e)=>this.props.onKeyDown(e,this.props.act)}
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
    this.handleChange=this.handleChange.bind(this);
	this.handleMouseDown=this.handleMouseDown.bind(this);
	this.handleKeyDown=this.handleKeyDown.bind(this);
    this.state={
    	inputVal: '',
    	todos:[],
    }
  }

    handleChange(e) {
		this.setState({
			inputVal: e.target.value,
		})
	}
	handleMouseDown(e) {
		if (e.button===2) {
			this.setState({
				inputVal: '',
			})
		}
	}
	handleKeyDown(e, act){
		switch (e.key) {
			case'Enter':
				this.addTodo(this.state.inputVal);
				break;
			case'Escape':
				console.log("esc");
				break;
		}
		console.log(e.key);
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

  renderItem(todos){
  	todos.map((item,idx)=>{
		return (
			<li key={idx+1}>
				<Item text={item} onChange={()=>this.props.onChange(item, idx)} />
				<Button
					btnText='del'
					onClick={()=>this.props.onClick(idx)}
				/>
			</li>
		)
  }

  render() {
  	console.log(this.state.todos);
  	const count_num=this.state.todos.length;
  	const todos=this.state.todos;
	const showlist=renderItem(todos);
	});
    return (
      <div>
      	<h1>TODO： {count_num} 件 
      		<Button
				btnText='delAll'
				onClick={()=>this.delAllTodo()}
			/>
      	</h1>
      	<div className={'input'}>
      		<InputField
      			act={'add'}
				value={this.state.inputVal}
				onChange={this.handleChange}
				onMouseDown={this.handleMouseDown}
				onKeyDown={this.handleKeyDown}
			 />
		</div>
		<div className={'output'}>
			<Item />
		</div>
      </div>
    );
  }
};
