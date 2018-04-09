/**
 * Home
 */

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { compose, graphql } from 'react-apollo';
// Components
import Dropdown from '../../components/Dropdown/Loadable';
// Containers
import Categories from '../../containers/GetCategories/Loadable';
// Libraries
import { makeDebugger } from '../../lib';
// Styles
import Wrapper from './styles';

const debug = makeDebugger('Home');

class Home extends Component<{}, IState> {
  constructor(props) {
    super(props);

    this.state = {
      category: {
        name: '',
        value: '-1',
      },
    };
  }

  public componentDidMount() {
    setTimeout(() => {
      this.setState({
        category: {
          name: 'Automotive Industry',
          value: 'cje5zpib903lv0164blori54s',
        },
      });
    }, 5000);
  }

  public render() {
    return (
      <Wrapper>
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Description of Home" />
        </Helmet>
        <Categories
          render={
            ({ hasCategories, staleCategories }) => {
              const categories = (hasCategories && staleCategories.map((category) => {
                const { node } = category;

                return {
                  name: node.name,
                  value: node.id,
                };
              })) || [];

              return (
                <Dropdown
                  selected={this.state.category}
                  options={categories}
                  onChange={(data) => debug({ data })}
                />
              );
            }
          }
        />
      </Wrapper>
    );
  }
}

interface IState {
  category: object;
}

export default Home;
