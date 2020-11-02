import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import {auth, createUserProfileDocument} from"./firebase/firebase.utils";


class App extends React.Component {

    constructor() {
        super();

        this.state = {
            currentUser : null
        }
    }

    // to method  auth.onAuthStateChanged returns   !>>>> firebase.Unsubscribe <<<<!
    //https://stackoverflow.com/questions/42762443/how-can-i-unsubscribe-to-onauthstatechanged

    unsubscribeFromAuth = null;

    componentDidMount() {
        //to onAuthStateChanged pairnei ws argument mia function kai kanei subscribe se aythn etsi wste na thn
        // trexei se kathe state change.Meta kanei return mia alli function h opoia otan treksei stamataei to
        // subscribe sthn prwth function pou perasame san argument.
         this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth){
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapshot => {
                    this.setState({
                        currentUser:{
                            id : snapshot.id,
                            ...snapshot.data()
                        }
                    });
                    console.log(this.state)
                })
            } else {
                this.setState({
                    currentUser : userAuth
                })
            }
        })

    }

    componentWillUnmount() {
          this.unsubscribeFromAuth();
          console.log("subscription ended")
    }

    render() {
        return (
            <div>
                <Header currentUser={this.state.currentUser} />
                <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route path='/shop' component={ShopPage}/>
                    <Route path='/signin' component={SignInAndSignUpPage}/>
                </Switch>
            </div>
        );
    }
}

export default App;
