import { observable, computed } from 'mobx';

import axios from 'axios';

class AppState {
  @observable campers = [];

  // this is view state, shouldnt belong here
  @observable sort_col; // ALLTIME RECENT
  @observable sort_order; // ASC DEC

  constructor() {
    this.sort_col = "RECENT";
    this.sort_order = "DEC";

    axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
      .then(response => {
        // key is for react
        this.campers = response.data.map((item, index) => { return { ...item, key: index } });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // this should go in view component and sort logic could probably be more elegant
  clickToggleSort(column) {
    if (column === this.sort_col) {
      this.sort_order = this.sort_order === "DEC" ? "ASC" : "DEC";
    } else {
      this.sort_col = column;
      this.sort_order = "DEC";
    }

    this.campers = this.campers.sort((a, b) => {
      if (column === "RECENT") {
        if (this.sort_order === "DEC") {
          return b.recent - a.recent == 0 ? b.alltime - a.alltime : b.recent - a.recent;
        }
        return a.recent - b.recent == 0 ? a.alltime - b.alltime : a.recent - b.recent;
      }

      if (column === "ALLTIME") {
        if (this.sort_order === "DEC") {
          return b.alltime - a.alltime == 0 ? b.recent - a.recent : b.alltime - a.alltime;
        }
        return a.alltime - b.alltime == 0 ? a.recent - b.recent : a.alltime - b.alltime;
      }
    });
    //console.log(this.campers);
  }

}

export default AppState;
