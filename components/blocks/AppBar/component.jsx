import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { userLogOut } from 'actions'
import CustomLink from 'components/controls/RouterLink'
import { singOutUsingFirebase } from 'utils/fireBase'

import {
  ROUT_FOR_MAP_PAGE,
  ROUT_FOR_SETTINGS_PAGE,
  ROUT_FOR_EVENT_MANAGEMENT_PAGE,
} from 'constants.js'

import {
  AppBar,
  Toolbar,
  Menu,
  IconButton,
  MenuIcon,
  Wrapper,
  AccountCircle,
  MenuItem,
  UserName,
  Img,
  MenuWrapper,
  SettingsIcon,
  MapIcon,
  TocIcon,
} from './styles'

const routerLinkInfo = [
  {
    className: 'caches-link',
    to: ROUT_FOR_SETTINGS_PAGE,
    defaultMessage: 'settings',
  },
  {
    className: 'caches-link',
    to: ROUT_FOR_MAP_PAGE,
    defaultMessage: 'map',
  },
  {
    className: 'caches-link',
    to: ROUT_FOR_EVENT_MANAGEMENT_PAGE,
    defaultMessage: 'management',
  },
]

export default function NavigationBar() {
  const { name, photoUrl, isLogged, email } = useSelector((state) => state.user)
  
  const router = useRouter()
  const dispatch = useDispatch()
  const [userAnchorEl, setUserAnchorEl] = useState(null)
  const [menuAnchorEl, setMenuAnchorEl] = useState(null)
  const openUserMenu = Boolean(userAnchorEl)
  const openNavigationMenu = Boolean(menuAnchorEl)

  const handleUserMenuOnClick = (event) => {
    setUserAnchorEl(event.currentTarget)
  }

  const handleNavigationMenuOnCLick = (event) => {
    setMenuAnchorEl(event.currentTarget)
  }

  const closeNavigationMenu = () => {
    setMenuAnchorEl(null)
  }

  const CloseUserMenu = () => {
    setUserAnchorEl(null)
  }

  const userSingOut = () => {
    setUserAnchorEl(null)
    dispatch(userLogOut(false))
    singOutUsingFirebase()
    router.push('/signIn')
  }

  const iconLink = (link) => {
    switch (link.to) {
      case ROUT_FOR_SETTINGS_PAGE:
        return <SettingsIcon />
      case ROUT_FOR_MAP_PAGE:
        return <MapIcon />
      case ROUT_FOR_EVENT_MANAGEMENT_PAGE:
        return <TocIcon />
      default:
        break
    }
  }

  const userPhoto = <Img src={`${photoUrl}`} alt="" />

  return (
    <Wrapper>
      <AppBar position="static">
        <Toolbar>
          <MenuWrapper>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleNavigationMenuOnCLick}>
              <MenuIcon className="menu-icon" />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={menuAnchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={openNavigationMenu}
              onClose={closeNavigationMenu}>
              {routerLinkInfo.map((item) => {
                return (
                  <MenuItem key={item.to}>
                    <Link key={item.to} href={item.to}>
                      <CustomLink className={item.className}>
                        {item.defaultMessage}
                      </CustomLink>
                    </Link>
                  </MenuItem>
                )
              })}
            </Menu>
          </MenuWrapper>

          <div>
            {routerLinkInfo.map((item) => {
              return (
                <Link className={item.className} key={item.to} href={item.to}>
                  <CustomLink className={item.className}>
                    {iconLink(item)}
                  </CustomLink>
                </Link>
              )
            })}
          </div>

          <div>
            <UserName>{isLogged && name !== 'null' ? name : email}</UserName>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleUserMenuOnClick}
              color="inherit">
              {isLogged && photoUrl !== 'null' ? userPhoto : <AccountCircle />}
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={userAnchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={openUserMenu}
              onClose={CloseUserMenu}>
              <MenuItem onClick={userSingOut}>Log-out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Wrapper>
  )
}
