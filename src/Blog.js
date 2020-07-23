import React from 'react';
import styles from './blog.module.css';

class Blog extends React.Component {
    constructor(props) {
        super(props);
	this.state = ({posts: [], waiting: true})
    }

    componentDidMount() {
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
    render() {
        return  (
	    <div className={styles.blog}>
                <h2>{this.props.post.title}</h2>
		<p>{this.props.post.content}</p>
            </div>
	)
    }
}

export default Blog;
