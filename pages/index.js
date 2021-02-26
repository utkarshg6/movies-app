import React, { Component } from 'react';
import Layout from '../components/layout';
import MovieCard from '../components/movie-card';
import { Card, Header, Icon } from 'semantic-ui-react';

const headingStyle = {
    'color': '#fff',
    'marginTop': "25px"
}

class ComponentIndex extends Component {

    state = {
        movies: []
    }

    componentDidMount() {

        const popularMoviesURL =
            'https://api.themoviedb.org/3/movie/popular?api_key=cb4a1628811db83e67e78e9eda59ef8b&language&language=en-US&page=1'

        fetch(popularMoviesURL)
            .then(res => res.json())
            .then(result => {
                this.setState({
                    movies: result.results
                })
            })
    }

    renderMovies() {
        return this.state.movies.map((movie) => {
            return (
                <MovieCard
                    key={movie.id}
                    image={'https://image.tmdb.org/t/p/w500' + movie.poster_path}
                    header={movie.title}
                    meta={movie.release_date}
                    description={movie.overview}
                />
            )
        })

    }

    render() {
        return (
            <Layout>
                <div>
                    <Header as='h2' textAlign='center'>
                        <Header.Content style={headingStyle}>Hot Movies to Watch</Header.Content>
                    </Header>
                    {/* <h3 color='#fff'>Hot Movies</h3> */}
                    <Card.Group>
                        {this.renderMovies()}
                    </Card.Group>
                </div>
            </Layout>
        )
    }
}

export default ComponentIndex
