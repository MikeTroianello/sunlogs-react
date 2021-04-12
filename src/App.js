import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import Main from './Main'

import {getToken} from './redux/actionCreators/userActionCreator'

const App = (props) => {
  useEffect(() => {
    props.getToken();
  });
  return <Main/>
}
const mapDispatchToProps = { getToken };

export default connect(null, mapDispatchToProps)(App)