"use client";

import React from "react";
import styled from "styled-components";
import { useGlobalState } from "../context/globalContextProvider";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import menu from "@/app/utils/menu";

const Sidebar = () => {
  const { theme } = useGlobalState();
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (link: string) => {
    router.push(link);
  };

  return (
    <SidebarStyled theme={theme}>
      <div className="profile">
        <div className="profile-overlay"></div>
        <Image
          width={70}
          height={70}
          src="https://avatar.iran.liara.run/public/46"
          alt="profile"
        />
        <h1>
          <span>Akon</span>
          <span>Icon</span>
        </h1>
      </div>
      <ul className="nav-items">
        {menu.map((item) => {
          const link = item.link;

          return (
            <li
              className={`nav-item ${pathname === link ? "active" : ""}`}
              onClick={() => {
                handleClick(item.link);
              }}>
              {item.icon}
              <Link href={link}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
      <button></button>
    </SidebarStyled>
  );
};

const SidebarStyled = styled.nav`
  position: relative;
  width: ${(props) => props.theme.sidebarWidth};
  background-color: ${(props) => props.theme.colorBg2};
  border-right: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${(props) => props.theme.colorGrey3};
  padding: 1rem 0;
  transition: all 0.3s ease;

  .profile {
    margin: 1.5rem;
    position: relative;
    padding: 1.5rem 1rem;
    border-radius: 1rem;
    cursor: pointer;
    font-weight: 500;
    color: ${(props) => props.theme.colorGrey0};
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: all 0.3s ease;

    &:hover {
      .profile-overlay {
        opacity: 0.3;
      }
    }
  }

  .profile-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px);
    z-index: 0;
    background: ${(props) => props.theme.colorBg3};
    transition: all 0.3s ease;
    border-radius: 1rem;
    border: 2px solid ${(props) => props.theme.borderColor2};
    opacity: 0.2;
  }

  h1 {
    font-size: 1.2rem;
    display: flex;
    flex-direction: column;
    line-height: 1.2;
    font-weight: 600;

    span:last-child {
      color: ${(props) => props.theme.colorGrey3};
      font-size: 0.9rem;
    }
  }

  .image,
  h1 {
    position: relative;
    z-index: 1;
  }

  .image {
    flex-shrink: 0;
    display: inline-block;
    overflow: hidden;
    transition: all 0.3s ease;
    border-radius: 100%;
    width: 70px;
    height: 70px;
    border: 2px solid ${(props) => props.theme.borderColor2};

    img {
      border-radius: 100%;
      transition: all 0.3s ease;
      object-fit: cover;
    }

    &:hover {
      transform: scale(1.05);
    }
  }

  .nav-items {
    padding: 0 1rem;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .nav-item {
      position: relative;
      padding: 0.8rem 1rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      border-radius: 0.8rem;
      cursor: pointer;
      transition: all 0.3s ease;
      color: ${(props) => props.theme.colorGrey3};

      &:hover {
        background-color: ${(props) => props.theme.colorBg3};
        color: ${(props) => props.theme.colorGrey0};
      }

      &.active {
        background-color: ${(props) => props.theme.colorBg3};
        color: ${(props) => props.theme.colorGrey0};
        font-weight: 500;
      }

      a {
        text-decoration: none;
        color: inherit;
        font-size: 0.9rem;
      }
    }
  }

  button {
    margin: 1.5rem;
    padding: 0.8rem;
    border-radius: 0.8rem;
    border: 2px solid ${(props) => props.theme.borderColor2};
    background-color: ${(props) => props.theme.colorBg3};
    color: ${(props) => props.theme.colorGrey0};
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: ${(props) => props.theme.colorBg2};
    }
  }
`;

export default Sidebar;
