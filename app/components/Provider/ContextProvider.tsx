"use client"

import React from 'react'
import GlobalSytlesProvider from './GlobalSytlesProvider'
import { GlobalContextProvider } from '@/app/context/globalContextProvider'

interface Props {
    children: React.ReactNode
}

const ContextProvider = ({ children }: Props) => {
  return (
    <GlobalContextProvider>
      <GlobalSytlesProvider>
        {children}
      </GlobalSytlesProvider>
    </GlobalContextProvider>
  )
}

export default ContextProvider