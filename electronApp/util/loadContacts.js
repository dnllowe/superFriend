const AddressBook = require('./AddressBook')
const db = require('../db/models')
const User = require('../db/models/user')

const ab = new AddressBook()

//This function is going to be used for the SYNC Contacts button.
//It will create new contacts if they didn't already exist, will also UPDATE them if anything was changed

//stateClient is probably null right now because this file isnt connected to the state AND the state is never passed into this function

const loadContacts = (stateClientId) => {
  // needs to read the iframe's content...


  return ab.fetchContacts()
    .then((contacts) => {

      console.log("========== FINISHED GETTING CONTACTS ===========")
      return Promise.all(contacts.map((elem) => {

        if (elem.ZFULLNUMBER) {
          return User.findOrCreate(
            {
              defaults: { ZFIRSTNAME: elem.ZFIRSTNAME, ZLASTNAME: elem.ZLASTNAME, ZFULLNUMBER: elem.ZFULLNUMBER },
              where: { ZFULLNUMBER: elem.ZFULLNUMBER.replace(/[^0-9]/g, '').slice(-10) }
            }
          )
          // .then((existingContact) => {
          //   console.log('you created a guy',existingContact[0])
          //   // stateClientId.addFriend(existingContact[0])
          //   // existingContact[0].update(elem)
          // })
        }
      }))
    })
}

//TODO: inlude emails into the contacts raw sql query from AddressBook.js
//TODO: write some TESTS testestestestestestest

module.exports = loadContacts



//this is the normal code without the crazy findone user thing:
// ab.fetchContacts()
//   .then((contacts) => {
//
//       contacts.forEach((elem) => {
//         console.log(ourUser)
//         if (elem.ZFULLNUMBER) {
//           User.findOrCreate(
//             {
//               defaults: {ZFIRSTNAME: elem.ZFIRSTNAME, ZLASTNAME: elem.ZLASTNAME, ZFULLNUMBER: elem.ZFULLNUMBER},
//               where: {ZFULLNUMBER: elem.ZFULLNUMBER.replace(/[^0-9]/g, '').slice(-10)}
//             }
//           )
//           .then((existingContact) => {
//             ourUser.addFriend(existingContact)
//             existingContact[0].update(elem)
//           })
//           .catch(console.error)
//         }
//       })
//   })



///////////////////////////////////////
//stuff below is all from before doing the revert... so its stuff that we are trying to revert..

// const AddressBook = require('./AddressBook')
// const db = require('APP/db')
// const User = require('../db/models/user')
// const iMessageContacts = require('../db/models/iMessageContacts')
//
// const ab = new AddressBook()
//
// //This function is going to be used for the SYNC Contacts button.
// //It will create new contacts if they didn't already exist, will also UPDATE them if anything was changed
//
// /**
//  * Loads the currently logged in user's contacts
//  * @param {Object} stateClient the currently logged in user from state.auth.user
//  */
// const loadContacts = (stateClient) => {
//   ab.fetchContacts()
//   .then((contacts) => {
//
//     contacts.forEach((elem) => {
//       if (elem.ZFULLNUMBER) {
//         iMessageContacts.findOrCreate(
//           {
//             defaults: { ZFIRSTNAME: elem.ZFIRSTNAME, ZLASTNAME: elem.ZLASTNAME, ZFULLNUMBER: elem.ZFULLNUMBER },
//             where: { ZFULLNUMBER: elem.ZFULLNUMBER.replace(/[^0-9]/g, '').slice(-10) }
//           }
//         )
//           .then((existingContact) => {
//             stateClient.addFriend(existingContact[0])
//             existingContact[0].update(elem)
//           })
//           .catch(console.error)
//       }
//     })
//   })
// }
// //TODO: inlude emails into the contacts raw sql query from AddressBook.js
// //TODO: write some TESTS testestestestestestest
//
// module.exports = loadContacts
//
