import React, { Component } from 'react'
import Layout from '../../components/layout';
import { Image, Header, Grid, Icon, Popup } from 'semantic-ui-react';

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
        vote_count: ''
    }

    static async getInitialProps(props) {
        const movie_id = props.query.movie_id

        return {
            movie_id: movie_id
        }
    }

    componentDidMount() {
        const movie_id = this.props.movie_id

        const movieURL =
            `https://api.themoviedb.org/3/movie/${movie_id}?api_key=cb4a1628811db83e67e78e9eda59ef8b&language=en-US`

        const movieImagesURL =
            `https://api.themoviedb.org/3/movie/${movie_id}/images?api_key=cb4a1628811db83e67e78e9eda59ef8b&language=en-US`

        const watchProviders =
            `https://api.themoviedb.org/3/movie/${movie_id}/watch/providers?api_key=cb4a1628811db83e67e78e9eda59ef8b`

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
            </Layout>
        )
    }
}

export default MoviePage
