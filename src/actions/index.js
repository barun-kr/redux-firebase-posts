import Firebase from 'firebase';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const CREATE_POSTS = 'CREATE_POSTS';

const Posts = new Firebase('https://contact-list-43092.firebaseio.com/contacts/');

export function fetchPosts(){
	return dispatch => {
		Posts.on('value', snapshot => {
			dispatch({ type: FETCH_POSTS, payload: snapshot.val() });
		});
	};
}

export function fetchPost(key) {
	return dispatch => {
		Posts.child(key).on('value', snapshot => {
			dispatch({ type: FETCH_POST, payload: snapshot.val() });
		});
	};
}

export function createPost(post){
	return dispatch => Posts.push(post);
}

export function deletePost(key) {
	return dispatch => Posts.child(key).remove();
}

export function updatePost(key, post) {
	return dispatch => Posts.child(key).update(post);
}
