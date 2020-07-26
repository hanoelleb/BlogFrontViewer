import React from 'react';
import styles from './blog.module.css';

import { Redirect } from 'react-router-dom';
import * as ROUTES from './constants/routes';

class Blog extends React.Component {
    constructor(props) {
        super(props);
	this.state = ({posts: [], waiting: true})
    }

    componentDidMount() {
	var test = 'http://localhost:8080/';
        var real = 'https://hanoelleb-blog-api.herokuapp.com/';
        fetch(real + 'api/posts')
            .then( response => response.json() )
            .then( data => {
                this.setState({posts: data.posts.post_list, waiting: false});
            });
    }

    render(){
        return(
        <div>
            <h2>Welcome!</h2>
	    { this.state.waiting ? <p>Loading...</p> : 
		this.state.posts.map( post => < BlogPost post={post} />)
	    }
        </div>
        )

    }
}

class BlogPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({toPost: false})
    }

    render() {
	if (this.state.toPost)
            return <Redirect to={ ROUTES.viewer + '/post/' + this.props.post._id} />
        return  (
	    <div className={styles.blog}>
                <h2 onClick={ ()=>{this.setState({toPost: true})} }>
		    {this.props.post.title}
                </h2>
		<p>{this.props.post.content}</p>
            </div>
	)
    }
}

export default Blog;
