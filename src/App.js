import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Features from './components/Features/Features';
import Footer from './components/Footer/Footer';
import Calendar from './components/Calendar/Calendar';
import Details from './components/Details/Details';
import FetchData from './service/FetchData';

import './style.css';

class App extends React.Component {

  fetchData = new FetchData();

  state = {
    rocket: 'Falcon 1',
    rocketFeatures: null,
    rockets: [],
    company: null,
  };

  componentDidMount() {
    //this.fetchData.getCompany().then(data => console.log(data));
    this.updateRocket();
    this.updateCompany();
  }

  updateRocket() {
    //console.log(this.state)

    this.fetchData.getRocket()
      .then(data => {
        this.setState({ rockets: data.map(item => item.name) });
        return data
      })
      .then(data => data.find(item => item.name === this.state.rocket)) // перебираем все рфкеты
      .then(rocketFeatures => {
        this.setState({ rocketFeatures }, () => {
          //console.log('после', this.state)
        });// получаем рокету после фильтрации и обновляем
      });
    //console.log('до', this.state);
  }

  changeRocket = rocket => { // мы поменяли свойство rocket и теперь нужно обновить данные
    this.setState({
      rocket
    }, this.updateRocket);
  }

  updateCompany = () => {
    this.fetchData.getCompany()
      .then(company => this.setState({ company }))
  }

  render() {
    //console.log(this.state)
    return (
      <BrowserRouter>
        <Header rockets={this.state.rockets} changeRocket={this.changeRocket} />
        <Route exact
          path='/'
          render={()=> this.state.company &&
            <Home company={this.state.company} />
          }
        />
        <Route exact
          path='/rocket'
          render={() => this.state.rocketFeatures &&
            <Features {...this.state.rocketFeatures} />
          }
        />
        <Route path='/calendar' component={Calendar} />
        <Route path='/details/:id' component={Details} />
        {this.state.company && <Footer {...this.state.company} />}
      </BrowserRouter>
    );
  }
}

export default App;
