"use client"

import React from 'react'
import styled from 'styled-components'
import { useGlobalState } from '../context/globalContextProvider'

const Sidebar = () => {

    const {theme} = useGlobalState();

  return (
    <SidebarStyled theme={theme}>Sidebar</SidebarStyled>
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