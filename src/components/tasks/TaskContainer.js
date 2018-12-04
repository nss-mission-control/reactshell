import React, { Component } from 'react'
import Tasks from './Tasks'

export default class TaskContainer extends Component {

  taskSorting = () => {
    return (
      <section className="container">

        <div className="columns is-variable is-3">

          <div id="Upcoming" className="column   ">
            <div onDragOver={(e) => e.preventDefault()}
              className="has-background-link">
              {this.props.tasks.map(singleTask => {
                if (singleTask.columnId === 1) {
                  return <Tasks task={singleTask} key={singleTask.id} />
                }
              })}
            </div>
          </div>
          <div id="InProgress" className="column  ">
            <div className="has-background-link">
              {this.props.tasks.map(singleTask => {
                if (singleTask.columnId === 2) {
                  return <Tasks task={singleTask} key={singleTask.id} />
                }
              })}
            </div>
          </div>
          <div id="Completed" className="column  ">
            <div className="has-background-link">
              {this.props.tasks.map(singleTask => {
                if (singleTask.columnId === 3) {
                  return <Tasks task={singleTask} key={singleTask.id} />
                }
              })}
            </div>
          </div>
        </div>
      </section>
    )

  }
  render() {
    return (
      this.taskSorting()
    )
  }
}