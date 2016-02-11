/**
* Utility to set/recover react-router History handler.
* This allows, for instance, redirect via Router from any module of the app.
* Import /utils/history and do history.get()
**/

let handler = null;

const historyHandler = {
  set: (history)=> {
    handler = history;
  },
  get: ()=> {
    return handler;
  }
};

export default historyHandler;
