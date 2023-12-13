import { Component } from "react";
import PropTypes from "prop-types";
import styles from "./ErrorBoundary.module.css";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: "" };
  }

  static getDerivedStateFromError = () => {
    return { hasError: true };
  };

  componentDidCatch(error) {
    this.setState({ errorInfo: error.message });
  }

  render() {
    if (this.state.hasError) {
      return <div className={styles["error-container"]}>{this.state.errorInfo}</div>;
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.any.isRequired,
};

export default ErrorBoundary;
