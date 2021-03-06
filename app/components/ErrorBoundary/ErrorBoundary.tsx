import React, { Component } from 'react';

// For debugging only.
import { makeDebugger } from '../../lib';
const debug = makeDebugger('ErrorBoundary');

/**
 * @render react
 * @name ErrorBoundary container
 * @description ErrorBoundary container.
 * @example
 * <ErrorBoundary />
 */

interface IProps {
  className?: string;
}

interface IState {
  hasError: boolean;
}

// eslint-disable-next-line react/prefer-stateless-function
class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  public componentDidCatch(error: object, errorInfo: object) {
    this.setState({
      hasError: true,
    });

    debug(error, errorInfo);
  }

  public render() {
    const { hasError } = this.state;

    if (hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
