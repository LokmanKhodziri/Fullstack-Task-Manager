"use client"

import React from 'react'
import styled from 'styled-components'

interface Props {
    children: React.ReactNode
}

const GlobalSytlesProvider = ({ children }: Props) => {
  return (
    <GlobalStyles>{children}</GlobalStyles>
  )
}

const GlobalStyles = styled.div`
    padding: 2.5rem;
    gap: 2.5rem;
    height: 100%;
    display: flex;
`

export default GlobalSytlesProvider