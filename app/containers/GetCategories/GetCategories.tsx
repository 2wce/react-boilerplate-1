import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ChildDataProps, compose, graphql } from 'react-apollo';
// Query
import getCategoriesGQL from '../../graphql/queries/getCategories.gql';
// Styles
import Wrapper, { Category } from './styles';

/**
 * @render react
 * @name GetCategories container
 * @description GetCategories container.
 * @example
 * <GetCategories
 *  onSelect={handleSelect}
 * />
 */

interface ICategory {
  node: {
    id: string,
    name: string,
  };
}

interface IProps {
  categories?: ICategory[];
  className?: string;
  render?: (state) => object;
}

interface IState {
  hasCategories: boolean;
  staleCategories: ICategory[];
}

class GetCategories extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      hasCategories: Boolean(props.categories && props.categories.length > 0),
      // Persisted "CATEGORIES"
      staleCategories: props.categories || [],
    };
  }

  public componentWillReceiveProps(nextProps) {
    const { categories, error, loading } = nextProps;

    if (!error && !loading) {
      const incomingCategories = categories;

      if (incomingCategories !== undefined) {
        this.setState({
          hasCategories: Boolean(incomingCategories && incomingCategories.length > 0),
          staleCategories: incomingCategories,
        });
      }
    }
  }

  public render() {
    const { className } = this.props;

    return (
      <Wrapper className={classNames('c-categories', className)}>
        { this.props.render(this.state) }
      </Wrapper>
    );
  }
}

// tslint:disable-next-line:interface-over-type-literal
type GQLResponse = {
  categories: {
    edges: ICategory[],
  },
};

type ChildProps = ChildDataProps<{}, GQLResponse>;

export default compose(
  graphql<{}, GQLResponse, {}, ChildProps>(getCategoriesGQL, {
    props: (props) => {
      const { data: { categories, error, loading }} = props;

      if (error) {
        return {
          data: props.data,
          error,
          loading,
        };
      }

      if (!categories) {
        return {
          data: props.data,
          loading,
        };
      }

      return {
        categories: categories.edges,
        data: props.data,
        loading,
      };
    },
  }),
)(GetCategories);
