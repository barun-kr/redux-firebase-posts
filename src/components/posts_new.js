import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class Postsnew extends Component {
	
	static contextTypes = {
		router: PropTypes.object
	};
	
	onSubmit(props){
		this.props.createPost(props)
		.then(() => { 
			this.context.router.push('/');
		});
	}
	 
	render(){
		const { fields: { title, categories, content}, handleSubmit} = this.props;
		return (
			<div className="well">
				<h3> Create a New Post </h3>
				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
					<div className="form-group">
						<label>Title</label>
						<input type="text" className="form-control" {...title}/>
					</div>
					<div className="form-group">
						<label>Categories</label>
						<input type="text" className="form-control" {...categories}/>
					</div>
					<div className="form-group">
						<label>Content</label>
						<textarea type="text" className="form-control" {...content}/>
					</div>
					<button type="submit" className="btn btn-primary">Submit</button>
					<Link to="/">
						<button className="btn btn-default">Cancel</button>
					</Link>	
				</form>
			</div>
		);
	}	
}

export default reduxForm({
	form: 'PostNewForm',
	fields: ['title', 'categories', 'content']
}, null , { createPost })(Postsnew);