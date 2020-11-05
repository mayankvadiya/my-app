import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router,Route,Link} from "react-router-dom"

//import component here
import TodosList from './components/todos-list.component'
import CreateToDo from './components/create-todo.component'
import EditToDo from './components/edit-todo.component'

//notification
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications'
function App() {
	return (
		<Router>
		<div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="https://google.com"  rel="noreferrer" target="_blank">
                    <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" />
                </a>
                <Link to="/" className="navbar-brand">
                    <h2>Mern-Stack ToDo Application</h2>
                </Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Todo</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Create Todo</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <br/>
            <Route path="/" exact component={TodosList} />
            <Route path="/create" exact component={CreateToDo} />
            <Route path="/edit/:id" exact component={EditToDo} />
            <NotificationContainer/>
		</div>
		</Router>
	);
}

export default App;
