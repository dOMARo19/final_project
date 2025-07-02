import React, {useState} from 'react'

const ErrorPage = () => {
    const [error, setError] = useState(false)
    const handleError = () => {
        setError(true)
        if (error) {
            throw new Error ('Error')
        }
    }

  return (
    <div>
      <h1>Error tests</h1>
      <button onClick={handleError}>Generate Error</button>
    </div>
  )
}

export default ErrorPage