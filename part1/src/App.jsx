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

  const Content = () => {
    return(
      <div>
        <Part title={course.parts[0].name} exercises={course.parts[0].exercises}/>
        <Part title={course.parts[1].name} exercises={course.parts[1].exercises}/>
        <Part title={course.parts[2].name} exercises={course.parts[2].exercises}/>
      </div>
    )
  }

  const Header = () => {
    return(<h1>{course.name}</h1>)
  }
  
  const Total = () => {
    return(
      <p>
        Number of exercises {course.parts[0].exercises}
      </p>
    )
  }

  return (
    <div>
      <Header/>
      <Content />
      <Total />
    </div>
  )
}

export default App