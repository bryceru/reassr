import React, { Component } from 'react';
import { connect } from 'react-redux';

import { api } from '../api';
import * as serverTodo from '../../server/api/serverTodo';
import { getList } from '../actions/todos';
import * as TODOS from '../constants/todos';

class Home extends Component {
  constructor(props, ctx) {
    super(props);

    this.state = {
      list: props.list || [],
      text: ''
    };
  }

  componentDidMount() {
    console.log('did mount', this.props.list.length);

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

    console.log('render', list);

    return (
      <div>
        <h1>Home page</h1>

        <form
          onSubmit={e => {
            e.preventDefault();

            const newTodo = {
              text
            };

            api.todos.create(newTodo).then(res => {
              this.setState({
                list: [...list, res],
                text: ''
              });
            });
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
  console.log('BEFORE FETCH DATA', store);

  return serverTodo.getList().then(list => {
    console.log('fetch data', list);

    store.dispatch({ type: TODOS.GET_LIST_SUCCESS, list });

    return {
      list
    };
  });
};

const mapStateToProps = state => {
  console.log('mapStateToProps', state.todos);
  return {
    list: state.todos.list,
    listGetting: state.todos.isGetting
  };
};

const mapDispatchToProps = {
  getList
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
