import React from 'react'
import { Card, Image } from 'semantic-ui-react'

const cardStyle = {
    'background': '#0D0D0D',
    'borderRadius': '24px',
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
            <Card.Header style={feedStyle}>{props.header}</Card.Header>
            <Card.Meta style={feedStyle}>
                <span className='date'>{props.meta}</span>
            </Card.Meta>
            <Card.Description style={feedStyle}>
                {props.description}
            </Card.Description>
        </Card.Content>
    </Card>

)

export default MovieCard
