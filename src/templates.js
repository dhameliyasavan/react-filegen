const classWithoutStyleTemplate = `import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

class <TemplateName> extends Component {
  	render() {
    	return <div><TemplateName> Component run</div>;
  	}
}

<TemplateName>.PropTypes = {
  	list: PropTypes.array
};

const mapStateToProps = (state) => ({ 
  	list: state.todo.list
})

const mapDispatchToProps = (dispatch) => {
	return {
		todo: () => dispatch({ type: 'TODO_ACTION' }),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(<TemplateName>)`;

const classWithStyleTemplate = `import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import styles from './style.module.css';

class <TemplateName> extends Component {
	render() {
		return <div className={styles.<TemplateName>}><TemplateName> Component run</div>;
	}
}

<TemplateName>.PropTypes = {
  	list: PropTypes.array
};

const mapStateToProps = (state) => ({ 
  	list: state.todo.list
})

const mapDispatchToProps = (dispatch) => {
	return {
		todo: () => dispatch({ type: 'TODO_ACTION' }),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(<TemplateName>)`;

const funWithoutStyleTemplate = `import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

const <TemplateName> = () => (
	<div>
		<TemplateName> Component run
	</div>
);

<TemplateName>.PropTypes = {
  	list: PropTypes.array
};

const mapStateToProps = (state) => ({ 
  	list: state.todo.list
})

const mapDispatchToProps = (dispatch) => {
	return {
		todo: () => dispatch({ type: 'TODO_ACTION' }),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(<TemplateName>)`;

const funWithStyleTemplate = `import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import styles from './style.module.css';

const <TemplateName> = () => (
	<div className={styles.<TemplateName>}>
		<TemplateName> Component run
	</div>
);

<TemplateName>.PropTypes = {
  	list: PropTypes.array
};

const mapStateToProps = (state) => ({ 
  	list: state.todo.list
})

const mapDispatchToProps = (dispatch) => {
	return {
		todo: () => dispatch({ type: 'TODO_ACTION' }),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(<TemplateName>)`;

const cssTemplate = `.<TemplateName>{
  margin:0;
  padding:0;
}`;


const reduxActionTemplate = `export const IN_PROGRESS_<ReducerName_To_UpperCase>_REQUEST = "IN_PROGRESS_<ReducerName_To_UpperCase>_REQUEST";
export const SUCCESS_<ReducerName_To_UpperCase>_REQUEST = "SUCCESS_<ReducerName_To_UpperCase>_REQUEST";
export const FAIL_<ReducerName_To_UpperCase>_REQUEST = "FAIL_<ReducerName_To_UpperCase>_REQUEST";

export const <ReducerName_To_CamelCase>RequestAction  = ({
    type: IN_PROGRESS_<ReducerName_To_UpperCase>_REQUEST,
})

export const <ReducerName_To_CamelCase>SuccessAction = payload => {
    return {
        type: SUCCESS_<ReducerName_To_UpperCase>_REQUEST,
        payload
    }
}

export const <ReducerName_To_CamelCase>FailAction = payload => {
    return {
        type: FAIL_<ReducerName_To_UpperCase>_REQUEST,
        payload
    }
}`;

const reduxReducerTemplate = `import { 
    IN_PROGRESS_<ReducerName_To_UpperCase>_REQUEST, 
    SUCCESS_<ReducerName_To_UpperCase>_REQUEST, 
    FAIL_<ReducerName_To_UpperCase>_REQUEST,
}
from './action.js';

const <ReducerName>State = {
    loading: false,
    data: [],
    error: null,
};

const <ReducerName>Reducer = (state = <ReducerName>State, action) => {
    switch (action.type) {
        case IN_PROGRESS_<ReducerName_To_UpperCase>_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case SUCCESS_<ReducerName_To_UpperCase>_REQUEST:
            return {
                ...state,
                loading: false,
                data: action.payload,
            };

        case FAIL_<ReducerName_To_UpperCase>_REQUEST:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

    	default:
        	return state
    }
}
  
export default <ReducerName>Reducer`;

const reduxEffectTemplate = `import axios from 'axios';
import { 
    <ReducerName_To_CamelCase>RequestAction, 
    <ReducerName_To_CamelCase>SuccessAction, 
    <ReducerName_To_CamelCase>FailAction,
} from './action';

export const fetch<ReducerName_To_PascalCase> = () => {
    dispatch(<ReducerName_To_CamelCase>RequestAction());
    return dispatch => {
        axios.get('API END POINT')
            .then((response) => dispatch(<ReducerName_To_CamelCase>SuccessAction(response.data)))
            .catch((error) => dispatch(<ReducerName_To_CamelCase>FailAction(error.response.data)));
    }
}`;

module.exports = {
    component: {
        classWithoutStyleTemplate,
        classWithStyleTemplate,
        funWithoutStyleTemplate,
        funWithStyleTemplate,
        cssTemplate
    },
	reducer:{
		reduxActionTemplate,
		reduxReducerTemplate,
		reduxEffectTemplate,
	}
}