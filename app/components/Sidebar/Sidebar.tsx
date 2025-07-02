'use client';

import React from 'react';
import styled from 'styled-components';
import { useGlobalState } from '../../context/globalContextProvider';
import { useClerk, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { DateTime } from 'luxon';
import { logout } from '@/app/utils/Icons';
import { useState } from 'react';

import menu from '@/app/utils/menu';
import Button from '../Button/Button';

const Sidebar = () => {
  const { theme, mounted } = useGlobalState();
  const { signOut } = useClerk();

  if (!mounted) return <div>Loading...</div>;

  // Only call these hooks after mounted is true

  const { user } = useUser();
  const { firstName, lastName } = user || { firstName: '', lastName: '' };

  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (link: string) => {
    router.push(link);
  };

  return (
    <SidebarStyled theme={theme}>
      <div className="profile">
        <UserButton />
        <h1>
          <span>{firstName || 'User'}</span>
          <span>{lastName || ''}</span>
        </h1>
      </div>
      <ul className="nav-items">
        {menu.map((item) => {
          const link = item.link;

          return (
            <li
              key={link}
              className={`nav-item ${pathname === link ? 'active' : ''}`}
              onClick={() => {
                handleClick(item.link);
              }}
            >
              {item.icon}
              <Link href={link}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
      <div className="sign-out relative m-6">
        <Button
          name={'Sign Out'}
          type={'submit'}
          padding={'0.4rem 0.8rem'}
          borderRadius={'0.8rem'}
          fw={'500'}
          icon={logout}
          click={() => {
            signOut(() => {
              router.push('/sign-in');
            });
          }}
        />
      </div>
    </SidebarStyled>
  );
};

const SidebarStyled = styled.nav`
  position: relative;
  width: ${(props) => props.theme.sidebarWidth};
  background-color: ${(props) => props.theme.colorBg2};
  border-right: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  height: 100%;
  width: 35vh;
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
    gap: 0.3rem
    transition: all 0.3s ease;

    .cl-rootBox {
      margin-left: 0.5rem;
    }
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

  .sign-out {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.5rem;
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

// In your formatDate utility, force UTC or a fixed locale
export function formatDate(date: string | Date) {
  return DateTime.fromISO(typeof date === 'string' ? date : date.toISOString())
    .setZone('utc')
    .toFormat('yyyy-MM-dd');
}

export default Sidebar;

export function UpdateNameForm() {
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      await user.update({ firstName, lastName });
      setMessage('Name updated!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <label>
        Last Name:
        <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </label>
      <button type="submit">Update Name</button>
      {message && <p>{message}</p>}
    </form>
  );
}
