const Current = ({ data }) => {
  return (
    <>
      <div className="flex flex-col mb-8 md:mb-0 items-start gap-2 w-1/2">
        <div className="flex items-center">
          <div>
            <h1>Today</h1>
            <p>{currentDate}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Current
