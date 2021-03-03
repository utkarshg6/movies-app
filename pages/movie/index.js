/*
This page will render detailed page of selected movie.
*/

import React, { Component } from 'react'
import Layout from '../../components/layout';
import { Image, Header, Grid, Icon, Popup } from 'semantic-ui-react';
import CreditsCard from '../../components/credits-card';

const feedStyle = {
    'color': '#fff'
}

const popupStyle = {
    'background': '#000000', 'opacity': '0.85'
}

class MoviePage extends Component {

    state = {
        adult: '',
        title: '',
        overview: '',
        poster_path: '',
        release_date: '',
        runtime: '',
        status: '',
        tagline: '',
        title: '',
        vote_average: '',
        vote_count: '',

        cast: []
    }

    static async getInitialProps(props) {
        const movie_id = props.query.movie_id

        return {
            movie_id: movie_id
        }
    }

    componentDidMount() {
        const movie_id = this.props.movie_id
        const API_KEY = 'cb4a1628811db83e67e78e9eda59ef8b'

        const movieURL =
            `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-US`

        const creditsMovieURL =
            `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${API_KEY}&language=en-US`

        fetch(movieURL)
            .then(res => res.json())
            .then(result => {
                this.setState({
                    adult: result.adult,
                    title: result.title,
                    overview: result.overview,
                    poster_path: 'https://image.tmdb.org/t/p/w500' + result.poster_path,
                    release_date: result.release_date.slice(0, 4),
                    runtime: `${parseInt(result.runtime / 60)} hr ${result.runtime % 60} mins`,
                    status: result.status,
                    tagline: `"${result.tagline}"`,
                    title: result.title,
                    vote_average: result.vote_average,
                    vote_count: result.vote_count
                })
            })

        fetch(creditsMovieURL)
            .then(res => res.json())
            .then(result => {
                this.setState({
                    cast: result.cast
                })
            })
    }

    renderCastMembers() {

        const topFiveCastMembers = this.state.cast.slice(0, 5)

        return topFiveCastMembers.map((cast_member) => {
            return (
                <Grid.Column key={cast_member.id}>
                    <CreditsCard
                        id={cast_member.id}
                        image={cast_member.profile_path ? 'https://image.tmdb.org/t/p/w500' + cast_member.profile_path : ''}
                        name={cast_member.name}
                        role={cast_member.character}
                    />
                </Grid.Column>
            )
        })
    }

    render() {
        return (
            <Layout>
                <Grid columns={3}>
                    <Grid.Row>
                        <Grid.Column>
                            <Image src={this.state.poster_path} />
                        </Grid.Column>
                        <Grid.Column>
                            <Header as='h2' style={feedStyle}>{this.state.title}</Header>
                            {this.state.tagline != `""` && (<p style={feedStyle}>{this.state.tagline}</p>)}
                            <p style={feedStyle}>{this.state.release_date}</p>
                            <p style={feedStyle}>{this.state.overview}</p>
                            <p style={feedStyle}>{this.state.runtime}</p>
                            <p style={feedStyle}>
                                <Popup
                                    content={this.state.adult ? "18+" : "Universal! Watch with family."}
                                    trigger={<Icon name={this.state.adult ? 'adn' : 'universal access'} />}
                                    position='bottom left'
                                    inverted
                                    style={popupStyle}
                                />
                                {' '}
                                <Popup
                                    content={'Total Votes: ' + this.state.vote_count}
                                    trigger={<Icon name='star' />}
                                    position='bottom left'
                                    inverted
                                    style={popupStyle}
                                />
                                {this.state.vote_average}
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Grid columns={5}>
                    <Grid.Row>
                        <Header as='h2' style={feedStyle}>Cast Members</Header>
                    </Grid.Row>
                    <Grid.Row>
                        {this.renderCastMembers()}
                    </Grid.Row>
                </Grid>
            </Layout>
        )
    }
}

export default MoviePage
