import React, { Component } from 'react'
import Layout from '../../components/layout';
import { Grid, Header, Image, Card } from 'semantic-ui-react';
import MovieCard from '../../components/movie-card';

const feedStyle = {
    'color': '#fff'
}

class PeoplePage extends Component {
    state = {
        biography: '',
        birthday: '',
        name: '',
        place_of_birth: '',
        profile_path: '',

        related_movies: []
    }

    static async getInitialProps(props) {
        const person_id = props.query.person_id

        return {
            person_id: person_id
        }
    }

    componentDidMount() {
        const { person_id } = this.props
        const API_KEY = 'cb4a1628811db83e67e78e9eda59ef8b'

        const personURL =
            `https://api.themoviedb.org/3/person/${person_id}?api_key=${API_KEY}&language=en-US`

        const movieCreditsURL =
            `https://api.themoviedb.org/3/person/${person_id}/movie_credits?api_key=${API_KEY}&language=en-US`

        fetch(personURL)
            .then(res => res.json())
            .then(result => {
                this.setState({
                    biography: result.biography,
                    birthday: new Date(result.birthday).toDateString().slice(4),
                    name: result.name,
                    place_of_birth: result.place_of_birth,
                    profile_path: 'https://image.tmdb.org/t/p/w500' + result.profile_path
                })
            })

        fetch(movieCreditsURL)
            .then(res => res.json())
            .then(result => {
                this.setState({
                    related_movies: result.cast
                })
                console.log(this.state.related_movies)
            })

    }

    renderRelatedMovies() {
        const topThreeMovies = this.state.related_movies.slice(0, 3);

        return topThreeMovies.map((movie) => {
            return (
                <MovieCard
                    key={movie.id}
                    id={movie.id}
                    image={movie.poster_path ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path : ''}
                    header={movie.title}
                    meta={movie.release_date ? movie.release_date.slice(0, 4) : ''}
                    description={'Played: ' + movie.character}
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
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column>
                            <Image src={this.state.profile_path} />
                        </Grid.Column>
                        <Grid.Column>
                            <Header as='h2' style={feedStyle}>{this.state.name}</Header>
                            <p style={feedStyle}>{`Born: ${this.state.birthday}, ${this.state.place_of_birth}`}</p>
                            <p style={feedStyle}>{this.state.biography}</p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Header as='h2' style={feedStyle}>Also appeared on: </Header>
                <Card.Group>
                    {this.renderRelatedMovies()}
                </Card.Group>
            </Layout>
        )
    }
}

export default PeoplePage
