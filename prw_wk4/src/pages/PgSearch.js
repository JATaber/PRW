import React , { Component } from 'react';
import GoSearch from 'react-icons/lib/go/search';
import Img from '../images/car.jpeg';


class PgSearch extends Component{
    constructor(props){
        super(props);

        this.state = {
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
            search: ''
        };
    }

    componentDidMount(){
        if(localStorage.getItem('pins')){
            let pins = JSON.parse(localStorage.getItem('pins'));
            this.setState({pins: pins})
        }
    }

    storageSearch(e){
        e.preventDefault();
        let allPins = JSON.parse(localStorage.getItem('pins'));
        let search = document.querySelector('#input').value;
        let title = this.state.title;
        let description = this.state.description;
        let pins = this.state.pins;
        let pin = {title: title, description: description};
        console.log(search);
        for(let x in allPins){

            console.log(allPins[x].description);

            if(allPins[x].title === search || allPins[x].description === search){
                pin = {title: allPins[x].title, description: allPins[x].description}
                pins.push(allPins[x]);
                this.setState({viewPins: pins});

                console.log(pins);
            }
        }
    }

    render(){
        return(
            <main className="searchPage">
                <h2>Search for Pins</h2>
                <section className="search">
                    <form className="searchForm">
                        <div className="append">
                            <input className="textInput" type="text" id="input" placeholder="Search" required />
                            <button className="submitBtn" type="submit" id="search" onClick={ (e) => this.storageSearch(e)}><GoSearch/></button>
                        </div>
                    </form>
                </section>
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
                                            </article>
                                        </li>);
                                })
                        }
                    </ul>
                </section>
            </main>
        );
    }
}

export default PgSearch