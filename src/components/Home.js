import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as serverTodo from '../../server/api/serverTodo';
import { createItem, getList } from '../actions/todos';
import * as TODOS from '../constants/todos';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: props.list || [],
      text: ''
    };
  }

  componentDidMount() {
    if (!this.props.list.length) this.props.getList();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.list !== this.props.list)
      this.setState({
        list: nextProps.list
      });
  }

  render() {
    const { text, list = [] } = this.state;
    const { listGetting = false } = this.props;

    return (
      <div>
        <h1>Home page</h1>

        <form
          onSubmit={e => {
            e.preventDefault();

            const newTodo = {
              text
            };

            this.props.createItem(newTodo);
          }}
        >
          <label htmlFor="todo">Add a todo</label>
          <br />
          <input
            id="todo"
            type="text"
            value={text}
            autoComplete="off"
            onChange={e =>
              this.setState({
                text: e.target.value
              })
            }
          />
        </form>

        {!!listGetting && <div>Loading</div>}

        {!listGetting && !!list.length && (
          <ul>
            {list.map(todo => (
              <li key={todo.id}>{todo.text}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

Home.fetchData = store => {
  return serverTodo.getList().then(list => {
    store.dispatch({ type: TODOS.GET_LIST_SUCCESS, list });

    return {
      list
    };
  });
};

const mapStateToProps = state => {
  return {
    list: state.todos.list,
    listGetting: state.todos.isGetting
  };
};

const mapDispatchToProps = {
  createItem,
  getList
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
