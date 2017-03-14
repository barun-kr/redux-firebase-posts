import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, updatePost} from '../actions/index';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';

class PostsEdit extends Component {
	
	static contextTypes = {
		router: PropTypes.object
	};
	
	componentWillMount(){
		this.props.fetchPost(this.props.params.id);
	}
	
	onDeleteClick(){
		this.props.deletePost(this.props.params.id)
		.then(() => {
			this.context.router.push('/');
		});
	}
	
	onSubmit(props){
		this.props.updatePost(this.props.params.id, props)
		.then(() => { 
			this.context.router.push('/');
		});
	}
	
	render(){
		const { fields: { title, categories, content}, handleSubmit} = this.props;
		
		return (
			<div className="well">
			<h3>Edit the Post</h3>
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

function mapStateToProps(state) {
	return { initialValues: state.posts.post};
}

export default reduxForm({
	form: 'PostShowForm',
	fields: ['title', 'categories', 'content'],
	enableReinitialize : true
}, mapStateToProps , { fetchPost, updatePost })(PostsEdit);
