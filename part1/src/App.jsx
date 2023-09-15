const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const Part = (props) => {
    return(
      <p>
        {props.title} {props.exercises}
      </p>
    )
  }

  const Content = () => {
    return(
      <div>
        <Part title={part1} exercises={exercises1} />
        <Part title={part2} exercises={exercises2} />
        <Part title={part3} exercises={exercises3} />
      </div>
    )
  }

  const Header = () => {
    return(<h1>{course}</h1>)
  }
  
  const Total = () => {
    return(
      <p>
        Number of exercises {exercises1 + exercises2 + exercises3}
      </p>
    )
  }

  return (
    <div>
      <Header/>
      <Content/>
      <Total />
    </div>
  )
}

export default App