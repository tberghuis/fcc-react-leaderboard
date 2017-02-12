import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

@inject("appState") @observer
class App extends Component {

  renderCamper(camper, index) {
    return (
      <tr key={camper.key}>
        <th scope="row">{index + 1}</th>
        <td>{camper.username}</td>
        <td>{camper.recent}</td>
        <td>{camper.alltime}</td>
      </tr>
    );
  }

  getColClass(column) {
    //console.log(column);
    if (column === this.props.appState.sort_col) {
      return "sorted " + this.props.appState.sort_order;
    }
    return "";
  }

  render() {
    return (
      <div>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Camper Name</th>
                <th
                  className={this.getColClass("RECENT")}
                  onClick={() => this.props.appState.clickToggleSort("RECENT")}>Points past 30 days</th>
                <th
                  className={this.getColClass("ALLTIME")}
                  onClick={() => this.props.appState.clickToggleSort("ALLTIME")}>Points all time</th>
              </tr>
            </thead>
            <tbody>
              {this.props.appState.campers.map(this.renderCamper)}
            </tbody>
          </table>
        </div>
        <DevTools />
      </div>
    );
  }

};

export default App;
