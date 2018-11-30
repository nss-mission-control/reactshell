import React, { Component } from 'react'
import Tasks from './Tasks'
import { DragDropContext } from 'react-beautiful-dnd'
import APIManager from '../../modules/APIManager'
import Column from './Column'

export default class TaskDragging extends Component {

  state = {
    tasks: [],
    columns: [{
      name: "Upcoming",
      id: 1,
      columnTasks: [1, 2, 3]

    },
    {
      name: "InProgress",
      id: 2,
      columnTasks: [4, 5, 6]

    },
    {
      name: "Completed",
      id: 3,
      columnTasks: [7, 8, 9]
    }],


    column_order: {
      columnId: []
    },

    taskLoaded: false


  }

  componentDidMount = () => {
    APIManager.getAllCategory("columns").then(data => {
      this.setState({ columns: data })
    }).then(() =>
      APIManager.getAllCategory("column_order"))
      .then(data => {
        this.setState({ column_order: data })
      }).then(() => APIManager.getAllCategory("tasks/?_expand=userId"))
      .then(data => {
        this.setState({ tasks: data })
      }).then(() => {
        this.setState({ taskLoaded: true })

      })
  }

  onDragEnd = result => {
    console.log(result)
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    };

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // grab last character

    const colID = source.droppableId.split('-');
    const column = this.state.columns[colID[1]-1];

    console.log("state - column" , this.state.columns, "column", column)

    // const newTaskIds = Array.from(column.columnTasks);
    // newTaskIds.splice(source.index, 1);
    // newTaskIds.splice(destination.index, 0, draggableId);

    // const newColumn = {
    //   ...column,
    //   taskIds: newTaskIds,
    // }

    // const newState = {
    //   ...this.state,
    //   columns: {
    //     ...this.state.columns,
    //     [newColumn.id]: newColumn,
    //   },
    // }
    // this.setState(newState);
  }




  render() {
    let newvar
    if (this.state.taskLoaded === true) {
      newvar = (<section className="container">
        <div className="columns is-variable is-3">
          <DragDropContext onDragEnd={this.onDragEnd}>
            {this.state.column_order.columnId.map(columnId => {
              const column = this.state.columns[columnId - 1];
              //this is based on an array not by id.  TODO: make it filter by id
              const tasks = column.columnTasks.map(taskId => {
                return this.state.tasks.filter(oneTask => oneTask.id === taskId)
              });
              return <Column key={column.id} column={column} tasks={tasks} />
            })
              // {this.props.tasks.map(singleTask => {
              //   return <Tasks task={singleTask} key={singleTask.id} />
              // })}
            }
          </DragDropContext>
        </div>
      </section>
      )
    }

    return (
      <React.Fragment>
        {newvar}
      </React.Fragment>
    )
  }
}