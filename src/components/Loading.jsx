import React from 'react'

function Loading() {
  return (
    <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p>please wait ...</p>
            </div>
  )
}

export default Loading