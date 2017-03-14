import React, { Component , PropTypes } from 'react';
import { connect } from 'react-redux';
import { deletePost} from '../actions/index';

class PostsDelete extends Component{
	
	static contextTypes = {
		router: PropTypes.object
	};
	
	handleClick() {
		this.props.deletePost(this.props.id)
		.then(() => { 
			this.context.router.push('/');
		});
	}
	
	render(){
		return (
			<button	onClick={this.handleClick.bind(this)}
			className="btn btn-danger right">
				Delete
			</button>
		);
	}
}

export default connect(null, { deletePost })(PostsDelete);