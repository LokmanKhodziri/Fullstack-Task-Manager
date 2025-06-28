"use client"

import { useGlobalState } from '@/app/context/globalContextProvider';
import React from 'react'
import styled from 'styled-components';

interface Props {
    icon: React.ReactNode;
    name?: string;
    backgroundColor?: string;
    padding?: string;
    borderRadius?: string;
    fw?: string;
    fs?: string;
    click?: () => void;
    type?: "button" | "submit" | "reset" | undefined;
    border?: string;
}

function Button({ icon, name, backgroundColor, padding, borderRadius, fw, fs, click, type, border }: Props) {

    const {theme} = useGlobalState();

  return (
    <ButtonStyled
    type={type}
    theme={theme}
    onClick={click}
    style={{
      backgroundColor: backgroundColor,
      padding: padding || "0.5rem 1rem",
      borderRadius: borderRadius || "0.5rem",
      fontWeight: fw || "500",
      fontSize: fs,
      border: border || "none",
        }}>
        {icon && icon}
        <span>{name}</span>
    </ButtonStyled>
  )
}

const ButtonStyled = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: ${(props) => props.theme.colorBg2};
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 1rem;
  border: none;
  color: ${(props) => props.theme.colorGrey0};
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  i{
  margin-right: 1rem;
  color: ${(props) => props.theme.colorGrey3};
  transition: all 0.3s ease-in-out;
  }

  &hover {
    color: ${(props) => props.theme.colorGrey0};

    i{
      color: ${(props) => props.theme.colorGrey0};
    }
  `

export default Button  