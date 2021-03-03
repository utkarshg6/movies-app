import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';
import { Link } from '../routes';

const cardStyle = {
    'background': '#171717'
}

const feedStyle = {
    'color': '#fff'
}

const CreditsCard = (props) => {
    return (
        <Card style={cardStyle}>
            <Image src={props.image} wrapped ui={false} />
            <Card.Content>
                <Link route={`/people/${props.id}`}>
                    <a>
                        <Card.Header style={feedStyle}>{props.name}</Card.Header>
                    </a>
                </Link>
                <Card.Meta style={feedStyle}>
                    {props.role}
                </Card.Meta>
            </Card.Content>
        </Card>
    )
}

export default CreditsCard
