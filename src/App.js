import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import {connect} from 'react-redux';
import {setCurrentUser} from "./redux/user/user.actions";

import './App.css';
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import {auth, createUserProfileDocument} from "./firebase/firebase.utils";


class App extends React.Component {


    // to method  auth.onAuthStateChanged returns   !>>>> firebase.Unsubscribe <<<<!
    //https://stackoverflow.com/questions/42762443/how-can-i-unsubscribe-to-onauthstatechanged

    unsubscribeFromAuth = null;

    componentDidMount() {
        const {setCurrentUser, currentUser} = this.props;


        //to onAuthStateChanged pairnei ws argument mia function kai kanei subscribe se aythn etsi wste na thn
        // trexei se kathe state change.Meta kanei return mia alli function h opoia otan treksei stamataei to
        // subscribe sthn prwth function pou perasame san argument.
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            // console.log('userAuth', userAuth, userAuth.displayName, userAuth.email )
            //an yparxei userAuth, diladi an yparxei authenticated xristis
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapshot => {
                    console.log("runs setCurrent user on snapshot") // this runs second
                    setCurrentUser({
                        id: snapshot.id,
                        ...snapshot.data()
                    });
                });
            }

            console.log("runs setCurrent user on userAuth = null prin to snapshot") //this runs first
                setCurrentUser(userAuth);
                // console.log(this.state)

        })

    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
        console.log("subscription ended")
    }

    render() {
        return (
            <div>
                <Header/>
                <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route path='/shop' component={ShopPage}/>
                    <Route exact path='/signin' render={()=> this.props.currentUser ? (<Redirect to='/' />) :( <SignInAndSignUpPage/>)}/>
                </Switch>
            </div>
        );
    }
}


//In addition to reading the state, container components can dispatch actions. In a similar fashion, you can define a
// function called mapDispatchToProps() that receives the dispatch() method and returns callback props
// that you want to inject into the presentational component.

const mapStateToProps = ({user}) => ({
    currentUser : user.currentUser
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
