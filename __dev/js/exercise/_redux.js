const redux = require('redux');
const createStore = redux.createStore;

const actionTypes = {
    greeting: 'GREETING'
};

// init state
const initState = {
    name: 'terry'
};

// reducers config 設置
const reducersConfig = {
    [actionTypes.greeting]: (state, action) => ({ ...state, name: `${state.name}: ${action.payload}` }),
};

// reducers
const todoApp = (state = initState, action) => {

    let newState;

    if (reducersConfig.hasOwnProperty(action.type)) {

        newState = reducersConfig[action.type](state, action);

    }
    else {

        newState = state;

    }

    return newState;

};

// store 創立
const terryStore = createStore(todoApp);

// subscribe 監聽
terryStore.subscribe(() => {

    console.log(terryStore.getState());

});

// dispatch 觸發
terryStore.dispatch({
    type: actionTypes.greeting,
    payload: 'qq'
});

terryStore.dispatch({
    type: actionTypes.greeting,
    payload: 'omg'
});

console.log('[end]: ', terryStore.getState());
