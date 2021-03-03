/*
Constant layout for all the web pages.
*/

import React from 'react';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';
import Header from './header';

export default (props) => {
    return (
        <Container>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
                />
                <style>{'body { background-color: #171717; }'}</style>
            </Head>
            <Header />
            {props.children}
        </Container>
    );
};
