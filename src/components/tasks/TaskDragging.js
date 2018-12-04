import React, { PureComponent } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import APIManager from '../../modules/APIManager'
import Column from './Column'

export default class TaskDragging extends PureComponent {

  state = {
    tasks: [],
    columns: [],
    column_order: {
      columnId: []
    },
    taskLoaded: false,
    timeForForm: false,
    formFieldContent: "",
    //stores the id of the task who's edit button has been clicked
    editButtonCheck: 0,
    editedTaskValue: "",
    editedDateValue: "",
    emptyFieldAlert: false,
    emptyFieldCheck: 0
  }

  componentDidMount = () => {
    let stateSetter = {}

    APIManager.getAllCategory('columns')
      .then(data => {
        stateSetter.columns = data
        return APIManager.getAllCategory("column_order")
      })
        .then(data => {
          stateSetter.column_order = data
          return APIManager.getAllCategory("tasks/?_expand=userId")
          })
          .then(data => {
            stateSetter.tasks = data
            stateSetter.taskLoaded = true;
            this.setState(stateSetter)
          })
  }


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
  }



  // Function to save value of the new task form to database
  newTaskSave = (evt) => {

    //capturing the id of the button that was clicked
    let columnOfButton = evt.target.id;
    //splits that id into an array of the text and number
    let columnOfButtonSplit = columnOfButton.split('-');
    //use that number and combine it with the text that starts the item in state to be able to call on that info
    let buildingVarable = "formFieldContent-"+columnOfButtonSplit[1]
    let dateBuildingVarable = "dateFieldContent-"+columnOfButtonSplit[1];

    //checks to make sure there is a value in the input
    if(this.state[buildingVarable] === undefined||this.state[buildingVarable] === ""|| this.state[dateBuildingVarable] === undefined||this.state[dateBuildingVarable] === ""){
      return this.setState({emptyFieldAlert: true, emptyFieldCheck: Number(columnOfButtonSplit[1])})

    }
    //turns it from a string of a number to a number number
    let individualColId = Number(columnOfButtonSplit[1])
    // build a task and send it to the database
    const stateToChange = {}
    APIManager.saveItem("tasks", {
      task: this.state[buildingVarable],
      userId: Number(sessionStorage.getItem("id")),
      columnId: individualColId,
      dueDate: this.state[dateBuildingVarable]
    })
      //copying state array and adding the id of the new task
      .then(data => {
        //is minus one to convert an id to an array value which is always one less
        let arrayofColumn1Tasks = Array.from(this.state.columns[individualColId-1].columnTasks)
        arrayofColumn1Tasks.unshift(data.id)
        //sends new column data to database
        return APIManager.updateItem("columns", individualColId, { columnTasks: arrayofColumn1Tasks })
      })
      //get the updated columns from database
      .then(() => APIManager.getAllCategory("columns"))
      //get updated tasks
      .then(data => {
        stateToChange.columns = data
        return APIManager.getAllCategory("tasks/?_expand=userId")
      })
      //updated state
      .then(data => {
        stateToChange.tasks = data
        stateToChange.emptyFieldAlert = false
        stateToChange.emptyFieldCheck = 0
        stateToChange[`formFieldContent-${individualColId}`]=""
        stateToChange[`dateFieldContent-${individualColId}`]=""
        this.setState(stateToChange)
      })
  }

  deleteTask = (evt) => {
    const stateToChange = {}
    let buttonId = evt.target.id
    //array postition [1] is task id and [2] is column id
    let splicedButtonId = buttonId.split('-')
    let taskId = Number(splicedButtonId[1]);
    let columnId = Number(splicedButtonId[2])

    //delete task from database
    APIManager.deleteItem("tasks", taskId)
    // get updated tasks
    .then(() => {return APIManager.getAllCategory("tasks/?_expand=userId")})
    // update column array in database
    .then(data => {
      stateToChange.tasks = data
      let arrayofColumnTasks = Array.from(this.state.columns[columnId-1].columnTasks)
      arrayofColumnTasks = arrayofColumnTasks.filter(item => item !== taskId)
      return APIManager.updateItem("columns", columnId, {columnTasks: arrayofColumnTasks})

    })
    //get updated columns
    .then(()=> APIManager.getAllCategory("columns"))
    //update state
    .then(data =>{
      stateToChange.columns = data
      this.setState(stateToChange)
    })
  }

  editTaskSave = (evt) => {
    let taskIdString = evt.target.id
    let taskIdStringArray = taskIdString.split('-')
    let taskId = Number(taskIdStringArray[1])
    let columnId = Number(taskIdStringArray[2])
    if(this.state.editedTaskValue === ""|| this.state.editedTaskValue === ""){
      return this.setState({emptyFieldAlert: true, emptyFieldCheck: columnId})

    }
    APIManager.updateItem('tasks', taskId, {task: this.state.editedTaskValue,dueDate: this.state.editedDateValue})
    .then(() => {return APIManager.getAllCategory("tasks")})
    .then((data) => {
      this.setState({
        tasks: data,
        editedTaskValue: "",
        editButtonCheck: 0,
        editDateChange: "",
        emptyFieldAlert: false,
        emptyFieldCheck: 0


      })
    } )
  }

  //determins which edit button was clicked
  editButtonClick = (evt) => {
    //gets the id
    let taskIdString = evt.target.id
    let taskIdStringArray = taskIdString.split('-')
    let taskId = Number(taskIdStringArray[1])
    //sets that id to state
    APIManager.getOneFromCategory('tasks', taskId)
    .then(data => {

      this.setState({editButtonCheck: taskId,
        editedTaskValue: data.task,
        editedDateValue: data.dueDate
      })
    })
  }

  editFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange.editedTaskValue = evt.target.value
    this.setState(stateToChange)
  }
  editDateChange = (evt) => {
    const stateToChange = {}
    stateToChange.editedDateValue = evt.target.value
    this.setState(stateToChange)
  }

  //sets state to the value of an input as it is typed
  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }



  render() {
    let columnRender
    if (this.state.taskLoaded === true) {
      columnRender = (<section className="container">
        <div className="columns is-variable is-3">
          <DragDropContext onDragEnd={this.onDragEnd}>
            {this.state.column_order.columnId.map(columnId => {
              const column = this.state.columns[columnId - 1];
              //this is based on an array not by id.  TODO: make it filter by id
              const tasks = column.columnTasks.map(taskId => {
                return this.state.tasks.filter(oneTask => oneTask.id === taskId)
              });
              return <Column passedState={this.state} key={column.id} column={column}
                              tasks={tasks} handleFieldChange = {this.handleFieldChange}
                              newTaskSave = {this.newTaskSave} deleteTask= {this.deleteTask}
                              editTaskSave={this.editTaskSave} editButtonClick = {this.editButtonClick}
                              editFieldChange = {this.editFieldChange} editDateChange = {this.editDateChange}/>
            })

            }
          </DragDropContext>
        </div>
      </section>
      )
    }
    return (
      <React.Fragment>

        {columnRender}

      </React.Fragment>
    )
  }
}
