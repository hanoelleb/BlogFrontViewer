import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from './constants/routes';

import styles from './blog.module.css';

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({waiting: true, post: {}, comments: []})
    }

    componentDidMount() {
        const id = this.props.match.params.id;
	
	var test = 'http://localhost:8080/';
        var real = 'https://hanoelleb-blog-api.herokuapp.com/';
        
	fetch(real + 'api/post/' + id, 
	{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then( response => response.json() )
	  .then( data => this.setState({ post: data.post,
                    comments: data.comments,
                    waiting: false})
            );

    }

    render() {
        if (this.state.waiting)
	    return <h2>Loading...</h2>

        return  (
            <div>
		<Link to={ROUTES.viewer}>View all posts</Link>
                <div className={styles.blog}>
		    <h2>{this.state.post.title}</h2>
                    <p>{this.state.post.content}</p>
	        </div>
                <CommentThread comments={this.state.comments}/>
            </div>
	)
    }
}

class CommentThread extends React.Component {
    renderComment(comment) {
        return (
            <div>
		<h3>{comment.author}</h3>
		<p>{comment.content}</p>
            </div>
	)
    }

    render() {
	console.log(this.props.comments);
        return (
          <div>
            <h2>Comments</h2>
            {this.props.comments.length > 0 ? 
                 this.props.comments.map( comment => 
		     { this.renderComment(comment); } )
		 :
		 <h3>No comments on this post</h3>
            }
          </div>
	)
    }
}

export default Page;
