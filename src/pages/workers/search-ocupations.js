import React, { Component } from 'react';
// import "./search-formations-ocupations.css";

class SearchOcupations extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ocupationsData: [],
        inputValue: '',
        inputIntValue: '',
        // inputOcupationIncomplete: true,
        autocompleteOcupationsResults: [],
        showOcupationsResults: false,
    };
    this.search = this.search.bind(this);
    this.buildList = this.buildList.bind(this);
    this.handleSearchDisable = this.handleSearchDisable.bind(this);
    this.handleResultClick = this.handleResultClick.bind(this);
    this.handleChangeOcupations = this.handleChangeOcupations.bind(this);
  }

handleChangeOcupations(event){
    const key = event.target.value.toUpperCase();
    this.setState({ inputValue: key, showOcupationsResults: true });
    if (key.length > 0) {
        this.search(key);
        let myUlSearch = document.querySelector("#autocomplete-results");
        myUlSearch.classList.add("ulSearch");

    } else {
        this.buildList([]);
    }
}

handleSearchDisable(event) {
    console.log("handeSearchDiable event: ", event)
    if (!event.relatedTarget.innerText.includes("Insertar Ocupación" || event.relatedTarget === "")) {
        // Clicked on <ul> OcupationsResutls
        this.setState({
            autocompleteOcupationsResults: [],
            // inputOcupationIncomplete: true,
            showOcupationsResults: false,
        });
        let myUlSearch = document.querySelector("#autocomplete-results");
        myUlSearch.classList.remove("ulSearch");
        this.props.handleInputOcupationIncomplete(true)
        return null
    }
}

search(key) {
    const results = this.props.ocupationsData.filter((ocupation) => {
            return ocupation['descripcion_ocupacion'].includes(key)
    });
    if (results.length > 0) {
        this.buildList(results.map(item => item));
    }
}

buildList(items) {
    console.log('elems', items);
    if (items === undefined) {
      items = [];
    }
    this.setState({ autocompleteOcupationsResults: items.slice(0, 20) });
}

handleResultClick(item) {
    console.log(item)
    // console.log("paso por handleResultClick!!")
    this.setState({ 
        inputValue: item.descripcion_ocupacion,
        inputIntValue: item.id_ocupacion,
        // inputOcupationIncomplete: false,
        showOcupationsResults: false,
        autocompleteOcupationsResults: []
    });
    this.props.handleOcupation(item.descripcion_ocupacion, item.id_ocupacion); // pasing ocupation data to parent component
    this.props.handleInputOcupationIncomplete(false)
    let myUlSearch = document.querySelector("#autocomplete-results")
    myUlSearch.classList.remove("ulSearch")
    this.buildList([]);
}

componentDidMount() {
    this.setState({
      ocupationsData: this.props.ocupationsData,
      inputValue: this.props.form.descripcion_ocupacion,
      inputIntValue: this.props.form.id_ocupacion
    });
}
    render() {
        return (
            <div className='autocomplete'>
                <input className="form-control inputOcupations" type="text" autoFocus={false} id='autocomplete-input'
                    placeholder='Introduzca Ocupacion (ej. "Abogado" o pruebe a borrar todo y empieze otra vez)'
                    value={this.state.inputValue}
                    onChange={(event) => this.handleChangeOcupations(event)}
                    onBlur={(event) => this.handleSearchDisable(event)}
                >

                </input>
                {/* <ul id='autocomplete-results' className='ulSearch autocomplete-results'> */}
                <ul id='autocomplete-results' className='autocomplete-results'>
                    {this.state.autocompleteOcupationsResults.map(result => {
                        return <li key={result.id_ocupacion} onClick={() => {this.handleResultClick(result)}}>{result.descripcion_ocupacion} </li>
                    })}
                </ul>
            </div>
        )
    }
}
export default SearchOcupations;
