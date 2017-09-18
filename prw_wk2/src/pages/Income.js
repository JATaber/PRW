import React, { Component } from 'react';
//import { NavLink } from 'react-router-dom';
import Modal from 'react-modal';
import MdAddCircle from 'react-icons/lib/md/add-circle';

const styles = {
    modalBack: {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 50
    },
    modalWindow: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class Income extends Component {
    constructor(props) {
        super(props);

        this.state = {isOpen: false};

        this.openModal = this.openModal.bind(this);
        //this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal(){
        this.setState({modalIsOpen: true})
    }

    closeModal(){
        this.setState({modalIsOpen: false})
    }
    /*
        afterOpenModal(){
            this.subtitle.style.color= '#f00'
        }
    */

    render(){
        return(
            <div className="content">
                <h2>Income</h2>
                <p className="desc">This is where you can enter and view what money you have coming in</p>
                <section>
                    <button className="submit" onClick={this.openModal}><MdAddCircle/>Add expense</button>

                    <Modal
                        isOpen={this.state.modalIsOpen}
                        //onAfterOpen={this.afterOpenModal}
                        onRequestClose = {this.closeModal}
                        style = {styles.modalWindow}
                        contentLabel = "Add Information"
                    >
                        <button onClick={this.closeModal}>
                            Close
                        </button>
                    </Modal>
                </section>
            </div>

        );
    }
}

export default Income;