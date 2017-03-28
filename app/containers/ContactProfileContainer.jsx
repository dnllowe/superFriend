import ContactProfile from '../components/ContactProfile'
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
   console.log('mapping state to props for contact profileeee', state);
  return {
  	messages: state.messages,
    contacts: state.contacts

  }
}

const ContactProfileContainer = connect(
  mapStateToProps
)(ContactProfile)

export default ContactProfileContainer
