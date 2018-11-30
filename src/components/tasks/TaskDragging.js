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

    taskLoaded: false,

    timeForForm: false,

    formFieldContent: ""


  }

  componentDidMount = () => {
    APIManager.getAllCategory("columns").then(data =>
      this.setState({ columns: data })
    ).then(() =>
      APIManager.getAllCategory("column_order")
    )
      .then(data => {
        this.setState({ column_order: data })
      }).then(() => APIManager.getAllCategory("tasks/?_expand=userId"))
      .then(data => {
        this.setState({ tasks: data })
      }).then(() => {
        this.setState({ taskLoaded: true })

      })
  }

  createNewTask = () => {


  }

  // refreshCol = () => {


  //   APIManager.saveItem("tasks", {
  //     task: "Test",
  //     userId: 1,
  //     columnId: 1
  //   })

  //   .then(data =>{
  //     console.log("columns", this.state.columns[0].columnTasks)
  //     let columnTaskAdd = this.state.columns


  //     columnTaskAdd = this.state.columns[0].columnTasks
  //     columnTaskAdd.push(data.id)
  //     console.log("column", columnTaskAdd)
  //     return columnTaskAdd
  //   })



  //     .then((data) => APIManager.updateItem("columns", 1, {columnTasks: data}))

  //     .then(()=>{

  //      return APIManager.getAllCategory("columns")})


  //       .then(data => {
  //         console.log("LOOKHERE:", this.state)
  //         this.setState({ columns: data,
  //         })

  //       }
  //   )
  // }


  onDragEnd = result => {
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
    const sourceColumn = this.state.columns[Number(sourceColID[1] - 1)];
    const destinationColumn = this.state.columns[Number(destinationColId[1] - 1)];
    const dragSplit = draggableId.split('-')

    if (destinationColId[1] === sourceColID[1]) {
      const sameDestandSourceTasksIds = Array.from(sourceColumn.columnTasks);
      sameDestandSourceTasksIds.splice(source.index, 1);
      sameDestandSourceTasksIds.splice(destination.index, 0, Number(dragSplit[1]));
      APIManager.updateItem("columns", sourceColID[1], { columnTasks: sameDestandSourceTasksIds })
        .then(() => APIManager.getAllCategory("columns"))
        .then((newColumnObj) => this.setState({
          columns: newColumnObj
        }))
    } else {
      //Creates a new array of the targets column tasks
      const destinationTaskIds = Array.from(destinationColumn.columnTasks);
      const sourceTaskIds = Array.from(sourceColumn.columnTasks);


      sourceTaskIds.splice(source.index, 1);

      // Splits draggableId so I can access just the number with dragSplit[1]
      destinationTaskIds.splice(destination.index, 0, Number(dragSplit[1]));

      // patch source column

      APIManager.updateItem("columns", sourceColID[1], { columnTasks: sourceTaskIds })
        .then(() => APIManager.updateItem("columns", destinationColId[1], { columnTasks: destinationTaskIds }))
        .then(() => APIManager.getAllCategory("columns"))
        .then((newColumnObj) => this.setState({
          columns: newColumnObj
        }))
    }

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



  newButtonClick = () => {
    this.setState({ timeForForm: true })
  }

  newTaskSave = () => {
    APIManager.saveItem("tasks", {
      task: this.state.formFieldContent,
      userId: 1,
      columnId: 1
    })
      //copying state array and adding a value
      .then(data => {
        let arrayofColumn1Tasks = Array.from(this.state.columns[0].columnTasks)
        arrayofColumn1Tasks.push(data.id)

        return APIManager.updateItem("columns", 1, { columnTasks: arrayofColumn1Tasks })



      })

      .then(() => APIManager.getAllCategory("columns"))
      .then(data => this.setState({ columns: data }))
  }

  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
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
              return <Column newButtonClick={this.newButtonClick} refreshCol={this.refreshCol} passedState={this.state} key={column.id} column={column} tasks={tasks} />
            })

            }
          </DragDropContext>
        </div>
      </section>
      )
    }


    //new task form
    let addTaskForm = ""
    if (this.state.timeForForm === true) {
      addTaskForm = (<div><input id="formFieldContent" type="text" onChange={this.handleFieldChange} /> <button onClick={this.newTaskSave}>Save</button></div>)
    }


    return (
      <React.Fragment>
        {addTaskForm}
        {newvar}

      </React.Fragment>
    )
  }
}