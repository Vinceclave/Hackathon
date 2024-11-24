import React from 'react'

const AlertErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-100 text-red-600 p-3 rounded-lg text-center mb-5">
      {message}
    </div>
  )
}

export default AlertErrorMessage
