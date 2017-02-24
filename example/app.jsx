import React from 'react';

function Button (props) {
	return (
		<button onClick={()=>props.onClick()}>{props.btnText}</button>
	)
}

class InputField extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			value:'' || this.props.text,
		}
	}
	handleChange(e) {
		this.setState({
			value: e.target.value,
		})
	}
	handleMouseDown(e, act) {
		if ((act==='add') && (e.button===2)) {
			this.setState({
				value: '',
			})
		}
	}
	handleKeyDown(e, act){
		switch (e.key) {
			case'Enter':
				console.log(e.key);
				return this.props.onKeyDown(e.target.value);
				break;
			case'Escape':
				return this.props.onBlur();
				break;
		}
		console.log(e.key);
	}
	render() {
		return (
			<input
			 placeholder="pls key in your todo item"
			 value={this.state.value}
			 onChange={(e)=>this.handleChange(e)}
			 onMouseDown={(e)=>this.handleMouseDown(e,this.props.act)}
			 onKeyDown={(e)=>this.handleKeyDown(e, this.props.act)}
			 onBlur={(e)=>this.props.onBlur()}
			 autoFocus
			 />
		)
	}
}
class Item extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			isEditable: false,
		}
	}
	toggleMode() {
		this.setState({
			isEditable: !this.state.isEditable,
		})
	}
	renderShow() {
		return (
			<div>
				<span onDoubleClick={()=>this.toggleMode()}>{this.props.text}</span>
				<Button
				 btnText='del'
				 onClick={()=>this.props.onClick()}
				 />
			</div>
		)
	}
	renderEdit() {
		return (
			<InputField
			 text={this.props.text}
			 onKeyDown={(value)=>this.props.onKeyDown(value)}
			 onBlur={()=>this.toggleMode()}
			 />
		)
	}
	render(){
		return (this.state.isEditable)? this.renderEdit(): this.renderShow()
	}
}

class List extends React.Component {
	constructor(props) {
		super(props);
	}

	render(){
		const todos=this.props.todos;

		const items=todos.map((el,idx)=>{
			return (
				<li key={idx}>
					<Item
					 text={el}
					 onKeyDown={(text)=>{this.props.onKeyDown(text,idx)}}
					 onClick={(id)=>this.props.onClick(idx)}
					 />
				</li>
			)
		})

		return (
			<ol>{items}</ol>
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
  	console.log(this.state.todos);
  	const count_num=this.state.todos.length;

  	return (
      <div>
      	<h1>TODO： {count_num} 件
      		<Button
			 btnText='delAll'
			 onClick={()=>this.delAllTodo()}
			/>
      	</h1><hr />
      	<InputField
      	 act={'add'}
      	 onBlur={()=>console.log('do nothing:這是父controller, 不想設onBlur, 卻因為所呼叫的子元件有onBlur event, 因此而跟著設定, 否則會出現Uncaught TypeError: _this2.props.onBlur is not a function')}
      	 onKeyDown={(val)=>this.addTodo(val)} />
  		<List
  		 todos={this.state.todos}
  		 onClick={(idx)=>this.delTodo(idx)}
  		 onKeyDown={(val, idx)=>this.updateTodo(val, idx)} />
  		<hr />
  		<p>[操作說明:]</p>
  		<ul>
  			<li><p>新增：<br />填寫待辦後按enter可新增；<br />按右鍵清除重填。</p></li>
  			<li><p>修改：<br />待辦列表double click可編輯, <br />按enter確定送出；<br />按esc或離開輸入框則取消編輯。</p></li>
  			<li><p>刪除：<br />按delAll全刪；按del刪除該項。</p></li>
  		</ul>
      </div>
    );
  }
};
