import React, { Component } from 'react'
import Tasks from './Tasks'
import { DragDropContext } from 'react-beautiful-dnd'
import APIManager from '../../modules/APIManager'
import Column from './Column'

export default class TaskDragging extends Component {

  state = {
    tasks: [],
    columns: [],


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
    // results is the object that contains info on the drag and drop
    // create access to these varables within the results object
    const { destination, source, draggableId } = result;

    //If no destination return nothing
    if (!destination) {
      return;
    };
    // if destination index and column are the same as source return nothing
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // The id has to be astring for beautiful dnd so when I need access to them I have to split the string
    //Source.droppableId is the column that the item is dropped in
    //Saves the specific column where it was dropped in the varable
    const sourceColID = source.droppableId.split('-');
    const destinationColId = destination.droppableId.split('-');
    console.log("sourceColID:", sourceColID,
    "destinationColId:", destinationColId)
    const sourceColumn = this.state.columns[Number(sourceColID[1]-1)];
    const destinationColumn = this.state.columns[Number(destinationColId[1]-1)];

    console.log("state - column" , this.state.columns, "column", sourceColumn)

    console.log("colTasks", sourceColumn.columnTasks);
    //Creates a new array of the targets column tasks
    const destinationTaskIds = Array.from(destinationColumn.columnTasks);
    const sourceTaskIds = Array.from(sourceColumn.columnTasks);

    console.log("destiation", destinationTaskIds, "source", sourceTaskIds)

   sourceTaskIds.splice(source.index, 1);

    // Splits draggableId so I can access just the number with dragSplit[1]
    const dragSplit = draggableId.split('-')
   destinationTaskIds.splice(destination.index, 0, Number(dragSplit[1]));
    console.log("destinationTaskIds:", destinationTaskIds, "sourceTaskId:", sourceTaskIds);

    // patch source column
    APIManager.updateItem("columns", sourceColID[1], {columnTasks: sourceTaskIds})
      .then(() => APIManager.updateItem("columns", destinationColId[1], {columnTasks: destinationTaskIds}))
      .then(() => APIManager.getAllCategory("columns"))
      .then((newColumnObj) =>
        {console.log(newColumnObj)
      this.setState({
        columns: newColumnObj
      })})

    // const newColumn = {
    //   ...column,
    //   taskIds: destinationTaskIds,
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