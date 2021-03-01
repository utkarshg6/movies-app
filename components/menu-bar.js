import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

const MenuBar = () => {
    return (
        <Menu inverted style={{ marginTop: "10px" }}>
            <Link route='/'>
                <a className='item'>
                    Movies
                </a>
            </Link>
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

export default MenuBar
