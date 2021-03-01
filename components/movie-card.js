import React from 'react'
import { Card, Image, Icon } from 'semantic-ui-react'
import { Link } from '../routes';

const cardStyle = {
    'background': '#0D0D0D',
    'borderRadius': '12px',
    'padding': '24px',
    'width': '360px'
}

const feedStyle = {
    'color': '#fff'
}

const buttonStyle = {
    'background': 'linear-gradient(90deg, rgba(69,56,242,1) 0%, rgba(99,61,248,1) 50%, rgba(132,66,254,1) 100%)'
}

const MovieCard = (props) => (
    <Card style={cardStyle}>
        <Image src={props.image} wrapped ui={false} />
        <Card.Content>
            <Link route={`/movie/${props.id}`}>
                <a>
                    <Card.Header style={feedStyle}>{props.header}</Card.Header>
                </a>
            </Link>
            <Card.Meta style={feedStyle}>
                <span className='date'>{props.meta}</span>
            </Card.Meta>
            <Card.Description style={feedStyle}>
                {props.description}
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Card.Description style={feedStyle}>
                <Icon name={props.adult ? 'adn' : 'universal access'} floated='right' />
                {' '}
                <Icon name='star' />
                {props.rating}
            </Card.Description>
        </Card.Content>
    </Card>

)

export default MovieCard
