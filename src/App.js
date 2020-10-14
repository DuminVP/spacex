import React from 'react';

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Features from './components/Features/Features';
import Footer from './components/Footer/Footer';
//import Calendar from './components/Calendar/Calendar';
//import Details from './components/Details/Details';
import FetchData from './service/FetchData';

import './style.css';

class App extends React.Component {
  
  fetchData = new FetchData();

  state = {
    rocket: 'Falcon 1',
    rocketfeatures: null,
    rockets: [],
  };

  componentDidMount() {
    //this.fetchData.getCompany().then(data => console.log(data));
    this.updateRocket();
  }

  

  updateRocket() {
    console.log(this.state)

    this.fetchData.getRocket()
      .then(data => {
        this.setState({ rockets: data.map(item => item.name) });
        return data
      })
      .then(data => data.find(item => item.name === this.state.rocket)) // перебираем все рфкеты
      .then(rocketFeatures => {
        this.setState({ rocketFeatures }, () => {
          console.log('после', this.state)
        });// получаем рокету после фильтрации и обновляем
      });
    console.log('до', this.state);
  }

  changeRocket = rocket => { // мы поменяли свойство rocket и теперь нужно обновить данные
    this.setState({
      rocket
    }, this.updateRocket);
  }

  render() {
    console.log(this.state)
    return (
      <>
        <Header rockets={this.state.rockets} changeRocket={this.changeRocket} />
        <Main rocket={this.state.rocket} />
        <Features />          
        <Footer />        
      </>
    );
  }
}

export default App;
