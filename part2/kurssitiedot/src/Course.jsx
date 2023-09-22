
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
      {props.parts.map( (part, i) =>
          <Part key= {part.id} title = {part.name} exercises = {part.exercises} />
      )}
    </div>
  )
}

const Header = (props) => {
  return(<h1>{props.name}</h1>)
}

const Total = (props) => {
  return(
    <p>
      Number of exercises {
       props.parts.map(
        part => part.exercises
       ).reduce((a, b) => a + b, 0)
      }
    </p>
  )
}

const Course = (props) => {
  return(
    <div>
      <Header name={props.course.name}/>
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts}/>
    </div>
  )
}


export default Course
