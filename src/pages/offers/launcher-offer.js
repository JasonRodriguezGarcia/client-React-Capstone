import React, { Component } from 'react'
import CreateEditOffer from './create-edit-offer'
import withRouter from '../../hooks/withRouter';

class LauncherOffer extends Component {
    constructor() {
        super();

        this.state ={
            toggleComponent: false,
            offerItem: {},
            offerId: "",
        };

        this.handleOfferItem = this.handleOfferItem.bind(this); // Offer Item
        this.handleOfferId = this.handleOfferId.bind(this);   // Offer Id even if editMode is ON
    }

handleOfferItem(data){  // store offer details for seaching criteria
    this.setState({
        offerItem: data
    });
}

handleOfferId(id){  // Store the offer id to be use in searching criteria
    this.setState({
        offerId: id
    });
}

  render() {
    return (
      <div>
        <CreateEditOffer offerEditMode = {this.props.offerEditMode} 
            handleToggleComponent = {this.handleToggleComponent}
            handleOfferItem = {this.handleOfferItem}
            handleOfferId = {this.handleOfferId}
        />
      </div>
    )
  }
}

export default withRouter(LauncherOffer);
