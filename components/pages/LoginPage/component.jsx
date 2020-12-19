import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import {
  SetUserSingInEmailRequest,
  SetUserSingInWithGoogleRequest,
} from 'actions'
import { ROUT_FOR_MAP_PAGE } from 'constants.js'

import { GoogleSignInButton } from './styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function SignIn() {
  const router = useRouter()
  const classes = useStyles()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleInputEmailChange = ({ target }) => {
    setEmail(target.value)
  }

  const handleInputPasswordChange = ({ target }) => {
    setPassword(target.value)
  }

  const handleOnSubmitFormSignIn = (e) => {
    e.preventDefault()
    dispatch(
      SetUserSingInEmailRequest({ userEmail: email, userPassword: password })
    )
  }

  const handleClickGoogleSignIn = () => {
    dispatch(SetUserSingInWithGoogleRequest())
  }

  useEffect(() => {
    if (user.isLogged) {
      router.push(ROUT_FOR_MAP_PAGE)
    }
  }, [user.isLogged])

  if (user.isLogged) {
    return null
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleOnSubmitFormSignIn}
          noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleInputEmailChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handleInputPasswordChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Sign In
          </Button>
        </form>
        <GoogleSignInButton onClick={handleClickGoogleSignIn}>
          Google
        </GoogleSignInButton>
      </div>
    </Container>
  )
}
