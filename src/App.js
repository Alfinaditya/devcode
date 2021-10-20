import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Header';
import Detail from './pages/detail[id]';
import Home from './pages/home';

function App() {
	return (
		<div className='App'>
			<Router>
				<Header />
				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='/detail/:id' component={Detail} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
