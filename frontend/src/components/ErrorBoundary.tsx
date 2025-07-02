import React from 'react'
import {useRouteError} from 'react-router-dom'
import ErrorPage from '../pages/ErrorPage'

const ErrorBoundary = () => {
  const error = useRouteError()
  console.error(error)

  return <ErrorPage />
}

export default ErrorBoundary