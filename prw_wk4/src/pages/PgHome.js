import React, { Component } from 'react';
import Modal from 'react-modal';
import MdDelete from 'react-icons/lib/md/delete';
import MdCreate from 'react-icons/lib/md/create';
import MdAdd from 'react-icons/lib/md/add';
import Img from '../images/car.jpeg';



const customStyle = {
    overlay : {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
  },
    content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    },
    modalHead: {
        backgroundColor: 'rgba(89, 2, 159, 1)'
    },
    errors: {
        color: 'red',
        listStyle: 'none'
    },
    btns: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    modalBtn: {
        backgroundColor: 'rgba(146, 129, 183, 1)',
        fontSize: '20px'
    },
    titleInput:{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '18px',
        marginBottom: '10px',
        marginTop: '20px'
    },
    desInput:{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '18px',
        marginBottom: '20px',
        msFlexAlign: 'top'
    },
    textArea: {
        verticalAlign: 'top',
        resize: 'none',
        width: '210px',
        fontSize: '20px',
        marginLeft: '10px'
    },
    textInput: {
        fontSize: '20px'
    }
};

class PgHome extends Component{
    constructor(props){
        super(props);

        this.state = {
            modalIsOpen: false,
            title: '',
            description: '',
            pins: [],
            id: '',
            edit: true,
            editTitle: '',
            editDescription: '',
            addErrors: [],
            editErrors: [],
            viewPins: [],
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.setDescription = this.setDescription.bind(this);
        this.addPin = this.addPin.bind(this);
        this.editPin = this.editPin.bind(this);
        this.removePin = this.removePin.bind(this);
        this.openEdit= this.openEdit.bind(this);
        this.closeEdit= this.closeEdit.bind(this);
    }

    componentDidMount(){
        if(localStorage.getItem('pins')){
            let pins = JSON.parse(localStorage.getItem('pins'));
            this.setState({pins: pins, viewPins: pins})
        }
    }

    validator(title, description){
        let errors = [];
        if(title.length === 0){
            errors.push('The title cannot be left blank.')
        }
        if(description.length === 0){
            errors.push('The description must not be left blank.')
        }
        return errors;
    }

    setTitle(e){
        e.preventDefault();
        this.setState({title: e.target.value})
    }

    setDescription(e){
        e.preventDefault();
        this.setState({description: e.target.value})
    }

    setEditTitle(e){
        e.preventDefault();
        this.setState({editTitle: e.target.value})
    }

    setEditDescription(e){
        e.preventDefault();
        this.setState({editDescription: e.target.value})
    }

    addPin(e){
        e.preventDefault();
        let title = this.state.title;
        let description = this.state.description;
        let errors = this.validator(title, description);

        if(errors.length !== 0){
            this.setState({addErrors: errors})
        }else{
            let pins = this.state.pins;
            let pin = {title: title, description: description};
            pins.push(pin);
            this.setState({pins: pins});
            localStorage.setItem('pins', JSON.stringify(pins));
            document.querySelector('#addTitle').value= "";
            document.querySelector('#addDescription').value= "";
            this.setState({addErrors: []});
            this.setState({title: "", description: ""});
            this.closeModal();
        }
    }

    removePin(e){
        e.preventDefault();
        let pins = this.state.pins;
        let id = e.target.parentElement.parentElement.parentElement;
        pins.splice(id, 1);
        this.setState({pins: pins});
        localStorage.setItem('pins', JSON.stringify(pins))
    }

    editPin(e){
        e.preventDefault();
        let id = e.target.parentElement.parentElement.innerHTML;
        console.log(id);
        let pin = this.state.pins[id];

        this.setState({edit: true, id: id, editTitle: pin.title, editDescription: pin.description}, () => {
            document.querySelector('#editTitle').value = pin.title;
            document.querySelector('#editDescription').value = pin.description;
        })
    }

    updatePin(e){
        e.preventDefault();

        let pins = this.state.pins;
        let id = this.state.id;
        let title = this.state.editTitle;
        let description = this.state.editDescription;
        let errors = this.validator(title, description);

        if(errors.length !== 0){
            this.setState({editErrors: errors})
        }else{
            let pin = {title: title, description: description};
            pins[id] = pin;
            this.setState({pins: pins});
            localStorage.setItem('pins', JSON.stringify(pins));
            this.closeEdit();
        }
    }

    openModal(){
        this.setState({modalIsOpen: true})
    }

    afterOpenModal(){
        this.subtitle.style.color = '#777';
    }

    closeModal(){
        this.setState({modalIsOpen: false})
    }

    openEdit(){
        this.setState({edit: true})
    }

    closeEdit(){
        this.setState({edit: false})
    }


    render(){
        return(
          <main>
              <h2>Your Board</h2>
              <div className="pageHead">
                  <div>
                    <p>This is where you can view, add, or edit your pins</p>
                  </div>
                  <button className="btn" onClick={this.openModal}><MdAdd className="mdAdd" />Add Post</button>
              </div>
              <Modal
                  isOpen={this.state.modalIsOpen}
                  onAfterOpen={this.afterOpenModal}
                  onRequestClose={this.closeModal}
                  style={customStyle}
                  contentLabel="Add Your Pin"
              >
                  <div style={customStyle.modalHead}>
                    <h2 ref={subtitle => this.subtitle = subtitle}>Add Pin</h2>
                  </div>
                  <form id="addPin">
                      <ul id="addErrors" className="errors" style={customStyle.errors}>
                          {
                              Object
                                  .keys(this.state.addErrors)
                                  .map((key) => {
                                    return(
                                        <li key={ key }>{ this.state.addErrors[key] }</li>
                                    );
                                  })
                          }
                      </ul>
                      <p style={customStyle.titleInput}>
                          <label>Title : </label>
                          <input style={customStyle.textInput} type="text" id="addTitle" placeholder="Title of Pin" onKeyUp={ (event) => this.setTitle(event) }/>
                      </p>
                      <p style={customStyle.desInput}>
                          <label >Description : </label>
                          <textarea style={customStyle.textArea} rows="10" id="addDescription" placeholder="Enter Description Here" onKeyUp={ (e) => this.setDescription(e) }/>
                      </p>
                      <p style={customStyle.btns}>
                          <button style={customStyle.modalBtn} className="modalBtn" type="submit" onClick={ (event) => this.addPin(event) }><span>SUBMIT</span></button>
                          <button style={customStyle.modalBtn} className="modalBtn" onClick={this.closeModal}>CLOSE</button>
                      </p>
                  </form>
              </Modal>
              <section className="pinPost">
                  <ul id="viewPins" className="viewPins">

                  {
                          Object
                              .keys(this.state.viewPins)
                              .map((key) => {
                                return(
                                    <li key={ key } className="pin">
                                        <article>
                                            <h3>{ this.state.viewPins[key].title }</h3>
                                            <img src={Img} alt="fun" className="artImg"/>
                                            <p>{ this.state.viewPins[key].description }</p>
                                            <div className="btnCont">
                                                <button className="icon" onClick={ (e) => this.editPin(e) }><MdCreate />EDIT</button>
                                                <button className="icon" onClick={ (e) => this.removePin(e)}><MdDelete />DELETE</button>
                                            </div>
                                        </article>
                                    </li>);
                              })
                      }
                  </ul>
              </section>
                  <Modal
                      isOpen={this.state.openEdit}
                      onAfterOpen={this.afterOpenModal}
                      onRequestClose={this.closeEdit}
                      style={customStyle}
                      contentLabel="Edit your Pin"
                  >
                      <form id="editPin">
                          <div style={customStyle.modalHead}>
                              <h2 ref={subtitle => this.subtitle = subtitle}>Edit Pin</h2>
                          </div>
                          <ul id="editErrors" className="errors" style={customStyle.errors}>
                              {
                                  Object
                                      .keys(this.state.editErrors)
                                      .map((key) => {
                                          return(
                                              <li key={ key }>{ this.state.editErrors[key] }</li>
                                          );
                                      })
                              }
                          </ul>
                          <p style={customStyle.titleInput}>
                              <label>Title</label>
                                  <input style={customStyle.textInput} id="editTitle" name="editTitle" type="text" onKeyUp={ (e) => this.setEditTitle(e) }/>
                          </p>
                          <p style={customStyle.desInput}>
                              <label>Description</label>
                                  <textarea style={customStyle.textArea} rows="10" id="editDescription" name="editDescription" type="text" onKeyUp={ (e) => this.setEditDescription(e) }/>
                          </p>
                          <p style={customStyle.btns}>
                              <button style={customStyle.modalBtn} type="submit" onClick={ (e) => this.updatePin(e) }>SAVE</button>
                              <button style={customStyle.modalBtn} className="close" onClick={ (e) => this.closeEdit(e) }>CLOSE</button>
                          </p>
                      </form>
                  </Modal>
          </main>
        );
    }
}

export default PgHome