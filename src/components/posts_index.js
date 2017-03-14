import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';
import PostsDelete from './posts_delete';
import { Link } from 'react-router';

class PostsIndex extends Component{
	
	componentWillMount(){
		this.props.fetchPosts();
	}
	
	renderPosts(){
		return _.map(this.props.posts, (post, key) => {
			return ( 
				<tr key={key}>
					<td>{post.title}</td>
					<td>{post.categories}</td>
					<td>{post.content}</td>
					<td><Link to={"posts/" + key}> <button className="btn btn-default">
						Edit</button></Link>  <PostsDelete id={key} />
					</td>
				</tr>
			);
    	});
	}
	
	render(){
		return (
			<div>
				<Link to="/posts/new">
					<button className="btn btn-primary pull-right">Add a Post</button>
				</Link>
				<h3> Posts</h3>
				<table className="table table-striped">
					<thead>
						<tr>
							<th>Title</th>
							<th>Category</th>
							<th>Content</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{this.renderPosts()}
					</tbody>
				</table>
			</div>
		);
	}
}

function mapStateToProps(state){
	return { posts: state.posts.all};
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);