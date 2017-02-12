import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

@inject("appState") @observer
class App extends Component {

  renderCamper(camper, index) {
    return (
      <tr key={camper.key}>
        <th scope="row">
          <span>{index + 1}</span>
        </th>
        <td>
          <span>
            <a href={"https://www.freecodecamp.com/"+camper.username} target="_blank"><img src={camper.img} /></a>
            <a href={"https://www.freecodecamp.com/"+camper.username} target="_blank">{camper.username}</a>
          </span>
        </td>
        <td>
          <span>{camper.recent}</span>
        </td>
        <td>
          <span>{camper.alltime}</span>
        </td>
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
        <div className="container">
          <h1>Freecodecamp Camper Leaderboard</h1>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Camper Name</th>
                <th>
                  <span role="button"
                    className={this.getColClass("RECENT")}
                    onClick={() => this.props.appState.clickToggleSort("RECENT")}>
                    Points past 30 days
                  </span>
                </th>
                <th>
                  <span role="button"
                    className={this.getColClass("ALLTIME")}
                    onClick={() => this.props.appState.clickToggleSort("ALLTIME")}>
                    Points all time
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.props.appState.campers.map(this.renderCamper)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

};

export default App;
