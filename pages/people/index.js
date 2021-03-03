import React, { Component } from 'react'
import Layout from '../../components/layout';
import { Grid, Header, Image } from 'semantic-ui-react';

const feedStyle = {
    'color': '#fff'
}

class PeoplePage extends Component {
    state = {
        biography: '',
        birthday: '',
        name: '',
        place_of_birth: '',
        profile_path: ''
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
            </Layout>
        )
    }
}

export default PeoplePage
