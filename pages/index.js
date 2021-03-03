/*
This page will render popular movies and is also the homepage.
*/

import React, { Component } from 'react';
import Layout from '../components/layout';
import MovieCard from '../components/movie-card';
import { Card } from 'semantic-ui-react';

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
                    id={movie.id}
                    image={'https://image.tmdb.org/t/p/w500' + movie.poster_path}
                    header={movie.title}
                    meta={movie.release_date.slice(0, 4)}
                    description={movie.overview}
                    rating={movie.vote_average}
                    adult={movie.adult}
                    votes={'Total Votes: ' + movie.vote_count}
                />
            )
        })

    }

    render() {
        return (
            <Layout>
                <Card.Group>
                    {this.renderMovies()}
                </Card.Group>
            </Layout>
        )
    }
}

export default ComponentIndex
