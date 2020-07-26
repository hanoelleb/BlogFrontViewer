import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from './constants/routes';

import styles from './blog.module.css';

class Page extends React.Component {
    constructor(props) {
        super(props);
	this.getData = this.getData.bind(this);
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

    getData() {
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
        else {
        return  (
            <div>
		<Link className={styles.blogLink} 
		    to={ROUTES.viewer}>View all posts</Link>
                <div className={styles.blog}>
		    <h2>{this.state.post.title}</h2>
                    <p>{this.state.post.content}</p>
	        </div>
                <CommentThread id={this.props.match.params.id} 
	            createHandler={this.getData} 
		    comments={this.state.comments}/>
            </div>
	)
	}
    }
}

class CommentThread extends React.Component {
    constructor(props) {
        super(props);
	this.closeForm = this.closeForm.bind(this);
	this.createHandler = this.createHandler.bind(this);
	this.state = ({openForm : false});
    }

    closeForm() {
        this.setState({openForm: false});
    }

    createHandler() {
	this.setState({openForm: false});
        this.props.createHandler();
    }

    render() {
        return (
          <div>
            <h2>Comments</h2>
            <button onClick={ ()=>{this.setState({openForm: true})} }>
		Post Comment
            </button>
            <div className='comments'>
            {this.props.comments.length > 0 ? 
                 this.props.comments.map( function(comment, index) { 
		      return (
			<div className={styles.comment} key={index}>
                          <h3>{comment.author}</h3>
                          <p>{comment.content}</p>
                        </div>)
		      })
		 :
		 <h3>No comments on this post</h3>
            }
            </div>
	    {this.state.openForm ? <CommentForm id={this.props.id} 
                 handler={this.closeForm} 
		 createHandler={this.createHandler}/> 
             : 
             null 
	    }
          </div>
	)
    }
}

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
	this.handleSubmit = this.handleSubmit.bind(this);
	this.handleChange = this.handleChange.bind(this);
        this.state = ({author: '', content: ''})
    }

    handleSubmit(event) {
        event.preventDefault();

	const comment = {
	    author: this.state.author,
            content: this.state.content
	}

        var test = 'http://localhost:8080/';
        var real = 'https://hanoelleb-blog-api.herokuapp.com/';
        
        fetch( real + 'api/post/' + this.props.id + '/comment', 
	{
            method: 'POST',
	    headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
	    },
	    body: JSON.stringify(comment)
	}).then( response => response.json() )
	  .then( data => this.props.createHandler() )
    }

    handleChange(event) {
        this.setState({[event.target.name] : event.target.value});
    }

    render() {
        return (
	  <form onSubmit={this.handleSubmit} className={styles.commentForm}>
              <button onClick={this.props.handler}>Cancel</button>
              <input type='text' name='author' 
               placeholder='name/nickname'
               value={this.state.name}
               onChange={this.handleChange}>
              </input>

              <textarea type='text' name='content' rows='4' cols='40'
               placeholder='Enter your comment.'
               value={this.state.content} 
               onChange={this.handleChange}>
              </textarea>

              <input type='submit' value='Post comment'></input>
          </form>
	)
    }
}

export default Page;
