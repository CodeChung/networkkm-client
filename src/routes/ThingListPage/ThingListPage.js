import React, { Component } from 'react'
import ThingListContext from '../../contexts/ThingListContext'
import ThingApiService from '../../services/thing-api-service'
import { Section } from '../../components/Utils/Utils'
import ThingListItem from '../../components/ThingListItem/ThingListItem'
import './ThingListPage.css'
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm'
import LoginForm from '../../components/LoginForm/LoginForm'
import HomePage from '../HomePage/HomePage'

export default class ThingListPage extends Component {
  static contextType = ThingListContext

  componentDidMount() {

  }

  renderThings() {
    const { thingList = [] } = this.context
    return thingList.map(thing =>
      <ThingListItem
        key={thing.id}
        thing={thing}
      />
    )
  }

  render() {
    const { error } = this.context
    return (
      <Section list className='ThingListPage'>
        <div className='landing-block'>
          <h1>Network Keith</h1>
          <p>You are invited to join one of the fastest growing personal network programs!!<br/>
          Maintain and grow your personal family & friend's relationships.
          <br/>
          Keep your family & friends updated on your life.
          <br/>
          Hundreds of programs are available to send meaningful information to only the friends and familuy members you want to share your life with.
          <br/>
          You now have the ability to chose the people in your life you want to share you information with by chosing on or all of you family and friends.
          <br/>
          The information you choose to share can easily be sent to one or all of your family and freinds.
          <br/>
          This new network program is designed to share the information you created. Your information remains private and is only seen by the family and freinds you choose. Your information can be removed at any time.
          <br/>
          We provide the network program free of charge and we are compensated only by the companies with advertisement on the network. We hope that you will support the companies that advertise.
          <br/>
          We never ask for credit card information or social security information and we never sell anything through this program.
          <br/>
          <b>Join Today!!! - It's Free!!!</b> Your friends and family can notify you by email or text or both.</p>
        </div>
        <RegistrationForm />
        <LoginForm />
      </Section>
      // <HomePage />
    )
  }
}
