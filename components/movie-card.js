/*
This Component provides a card to provide Movie Details.
*/

import React from 'react'
import { Card, Image, Icon, Popup } from 'semantic-ui-react'
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

const popupStyle = {
    'background': '#000000', 'opacity': '0.85'
}

const MovieCard = (props) => (
    <Card style={cardStyle}>
        <Image src={props.image} wrapped ui={false} />
        <Card.Content>
            <Link route={`/movie/${props.id}`}>
                <a>
                    <Card.Header as='h3' style={feedStyle}>{props.header}</Card.Header>
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
                <Popup
                    content={props.adult ? "18+" : "Universal! Watch with family."}
                    trigger={<Icon name={props.adult ? 'adn' : 'universal access'} />}
                    position='bottom right'
                    inverted
                    style={popupStyle}
                />
                {' '}
                <Popup
                    content={props.votes}
                    trigger={<Icon name='star' />}
                    position='bottom right'
                    inverted
                    style={popupStyle}
                />
                {props.rating}
            </Card.Description>
        </Card.Content>
    </Card>

)

export default MovieCard
