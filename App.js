import React from "react";

import LoginView from "./LoginView";
import SignupView from "./SignupView";
import ProfileView from "./ProfileView";
import dayView from "./dayView";

import { Alert} from 'react-native';
import { Button } from "react-native-elements"
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import manageActivity from "./manageActivity";
import newActivity from "./newActivity";
import editActivity from "./editActivity";
import manageMeals from "./manageMeals";
import newMeal from "./newMeal";
import home from "./home";
import Icon from "react-native-vector-icons/AntDesign"

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      accessToken: undefined,
      username: undefined,
    };

    this.login = this.login.bind(this);
    this.revokeAccessToken = this.revokeAccessToken.bind(this);
  }

  /**
   * A callback function to store username and accessToken in the state
   * This callback function is passed to `LoginView`
   *
   * @param {string} username
   * @param {string} accessToken
   */
  login(username, accessToken) {
    this.setState({
      username: username,
      accessToken: accessToken,
    });
  }

  /**
   * Revokes the access token in the state, so that the user is logged out
   *
   */
  revokeAccessToken() {
    this.setState({
      accessToken: undefined,
    });
  }

  /**
   * Defines a stack navigator for three screens, LoginView, SignupView, and ProfileView.
   *
   * We define the navigator to show only LoginView and SignupView if user is not logged in ('this.state.accessToken' does not exist)
   * and show ProfileView if the user is logged in (this.state.accessToken exists)
   *
   * See https://reactnavigation.org/docs/auth-flow/ for more details on the authentication flow.
   *
   * @returns `NavigationContainer`
   */
  render() {
    const AuthStack = createStackNavigator();

    return (
      <NavigationContainer>
        <AuthStack.Navigator >
          {!this.state.accessToken ? (
            <>
              <AuthStack.Screen
                name="SignIn"
                options={{
                  title: "Fitness Tracker Welcome",
                }}
              >
                {(props) => <LoginView {...props} login={this.login} />}
              </AuthStack.Screen>
              <AuthStack.Screen
                name="SignUp"
                options={{
                  title: "Fitness Tracker Signup",
                }}
              >
                {(props) => <SignupView {...props} />}
              </AuthStack.Screen>
            </>
          ) : (
//            <AuthStack.Screen
//              name="FitnessTracker"
//              options={{
//                title: "Fitness Tracker",
//              }}
//            >
//              {(props) => (
//                <ProfileView
//                  {...props}
//                  username={this.state.username}
//                  accessToken={this.state.accessToken}
//                  revokeAccessToken={this.revokeAccessToken}
//                />
//              )}
//            </AuthStack.Screen>
//
//            <AuthStack.Screen name="dayView" component={dayView} initialParams={{"username": this.state.username,"token": this.state.accessToken}} options={({ navigation, route}) => ({
//              headerTitle: "Day View",
//              headerLeft: () => (<Button title="Logout" onPress={this.revokeAccessToken}/>)
//            })}>
//            </AuthStack.Screen>
//            <AuthStack.Screen name="home" component={home} options={({ navigation, route}) => ({
//              headerTitle: "Home",
//              headerLeft: () => (<Button title="Logout" onPress={this.revokeAccessToken}/>)
//            })}>
//            </AuthStack.Screen>
//            <AuthStack.Screen name="manActivity" component={manageActivity} initialParams={{"token": this.state.accessToken}} options={({navigation, route}) => ({
//              headerTitle: "Manage Activity"
//            })}>
//            </AuthStack.Screen>
            <>
            <AuthStack.Screen name="Home" component={home} initialParams={{"username": this.state.username, "token": this.state.accessToken}} options={({navigation, route}) => ({
              title: "Home",
              headerLeft: () => (<Button title=" Logout" icon={<Icon name="logout" size={25} color="#e30022"/>} type="clear" color="#e30022" onPress={this.revokeAccessToken}/>)
            })}>
            </AuthStack.Screen>
            <AuthStack.Screen name="newActivity" component={newActivity} initialParams={{"token": this.state.accessToken}} options={({navigation, route}) => ({
              headerTitle: "New Activity"
            })}>
            </AuthStack.Screen>
            <AuthStack.Screen name="editActivity" component={editActivity} initialParams={{"token": this.state.accessToken}} options={({navigation, route}) => ({
              headerTitle: "Edit Activity"
            })}>
            </AuthStack.Screen>
            <AuthStack.Screen name="manMeal" component={manageMeals} initialParams={{"token": this.state.accessToken}} options={({navigation, route}) => ({
              headerTitle: "Manage Meals"
            })}>
            </AuthStack.Screen>
            <AuthStack.Screen name="newMeal" component={newMeal} initialParams={{"token": this.state.accessToken}} options={({navigation, route}) => ({
              headerTitle: "New Meal"
            })}>
            </AuthStack.Screen>
            </>
          )}
        </AuthStack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;