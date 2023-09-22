const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Part = (props) => {
    return(
      <p>
        {props.title} {props.exercises}
      </p>
    )
  }

  const Content = (props) => {
    return(
      <div>
        {props.course.parts.map( part =>
            <Part key= {part.name} title = {part.name} exercises = {part.exercises} />
        )}
      </div>
    )
  }

  const Header = (props) => {
    return(<h1>{props.course.name}</h1>)
  }
  
  const Total = (props) => {
    return(
      <p>
        Number of exercises {
         props.course.parts.map(
          part => part.exercises
         ).reduce((a, b) => a + b, 0)
        }
      </p>
    )
  }

  const Course = (props) => {
    return(
      <div>
        <Header course={props.course}/>
        <Content course={props.course} />
        <Total course={props.course}/>
      </div>
    )
  }

  return (
    <div>
      <Course course={course}/>
    </div>
  )
}

export default App