import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './styles.css';

const ProfileIcon = ({ onRouteChange, onToggleModal }) => {
    const [dropdownOpen, setDropDownOpen] = useState(false);

    const toggle = () => setDropDownOpen(prevState => !prevState);

    const viewProfile = () => onToggleModal();
    const signOut = () => onRouteChange('signout');

    return (
        <div className="profileIcon pa4 tc">
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle
                    tag="span"
                    data-toggle="dropdown"
                    aria-expanded={dropdownOpen}
                >
                    <img
                        src="http://tachyons.io/img/logo.jpg"
                        className="br-100 ba h3 w3 dib mb0"
                        alt="avatar" />
                </DropdownToggle>
                <DropdownMenu
                    right
                    className="b--transparent shadow-5"
                    style={{ backgroundColor: 'rgba(255,255,225,0.5)' }}>
                    <DropdownItem onClick={viewProfile}>View Profile</DropdownItem>
                    <DropdownItem onClick={signOut}>Sign Out</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}
export default ProfileIcon;