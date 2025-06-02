"use client"

import React from 'react'
import styled from 'styled-components'
import { useGlobalState } from '../context/globalContextProvider'
import Image from 'next/image'

const Sidebar = () => {

    const {theme} = useGlobalState();

  return (
    <SidebarStyled theme={theme}>
      <div className="profile">
        <div className="profile-overlay"></div>
        <Image width={70} height={70} src="https://avatar.iran.liara.run/public/46" alt="profile"/>
      </div>
      <h1>
        <span>Akon</span>
        <span>Icon</span>
      </h1>
    </SidebarStyled>
  )
}

const SidebarStyled = styled.nav`
    position: relative;
    width: ${(props) => props.theme.sidebarWidth};
    background-color: ${(props) => props.theme.colorBg2};
    border-right: 2px solid ${(props) => props.theme.borderColor2};
    border-radius: 1rem;
`;

export default Sidebar