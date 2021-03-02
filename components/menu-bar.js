import React, { Component } from 'react';
import { Menu, Search } from 'semantic-ui-react';
import { Link } from '../routes';
import _ from 'lodash';

const searchStyle = {
    'background': '#0D0D0D'
}

class MenuBar extends Component {
    state = {
        isLoading: false,
        results: [],
        value: ''
    }

    handleSearchChange = (e, { value }) => {
        if (value) {
            this.setState({ isLoading: true, value: value })

            const encoded_value = encodeURIComponent(value)
            const API_KEY = 'cb4a1628811db83e67e78e9eda59ef8b'

            const searchURL =
                `https://api.themoviedb.org/3/search/movie?query=${encoded_value}&api_key=${API_KEY}&language=en-US&page=1&include_adult=false`

            fetch(searchURL)
                .then(res => res.json())
                .then(result => {

                    let results = []

                    if (result.results) {
                        const topFiveResults = result.results.slice(0, 5)
                        results = topFiveResults.map((movie) => {
                            return {
                                "key": movie.id,
                                "id": movie.id,
                                "title": movie.title,
                                "image": (movie.poster_path ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path : ''),
                                "description": movie.release_date.slice(0, 4)
                            }
                        })
                    }

                    this.setState({
                        isLoading: false,
                        results: results
                    })
                })
        }

        this.setState({ isLoading: false, value: value })
    }

    render() {
        return (
            <Menu inverted style={{ marginTop: "10px" }}>
                <Link route='/'>
                    <a className='item'>
                        Movies
                </a>
                </Link>
                <Menu.Menu position='right'>
                    <Search
                        floated='right'
                        placeholder='Search any movie...'
                        loading={this.state.isLoading}
                        results={this.state.results}
                        value={this.state.value}
                        onSearchChange={_.debounce(this.handleSearchChange, 500, {
                            leading: true,
                        })}
                        style={searchStyle}
                    />
                </Menu.Menu>
                <Menu.Menu position='right'>
                    <Link route='/'>
                        <a className='item'>
                            My Movies
                    </a>
                    </Link>
                    <Link route='/'>
                        <a className='item'>
                            MetaMask
                    </a>
                    </Link>
                </Menu.Menu>
            </Menu>
        )
    }
}

export default MenuBar
