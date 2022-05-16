const Course = (props) => {
  return (
    <div>
      <Header courseName={props.course.name} />
      <Content content={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  )
}

const Header = (props) => {
  console.log("HEADER Props")
  console.log(props)
  return (
    <div>
      <h1>{props.courseName}</h1>
    </div>
  )
}

const Content = (props) => {
  const { content } = props
  console.log("CONTENT props")
  console.log(props)
  return (
    <div>
      {content.map(part =>
        <p key={part.id}>
          {part.name + " " + part.exercises}
        </p>)}
    </div>
  )
}


const Total = (props) => {
  const allExercises = props.parts.map(a => a.exercises)
  const initialValue = 0;
  const total = allExercises.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
  );
  return (
    <div>
      <p><strong>total of {total} exercises</strong></p>
    </div>
  )
}

export default Course