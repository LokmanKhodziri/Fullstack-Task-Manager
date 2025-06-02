"use client"

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

interface Props {
    children: React.ReactNode
}

const GlobalSytlesProvider = ({ children }: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

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