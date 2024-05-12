import ErrorBoundary from "../components/ErrorBoundary";

const WithErrorBoundary = (Component) => {
  const NewComponent = (props) => {
    return (
      <ErrorBoundary>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
  return NewComponent;
};

export default WithErrorBoundary;
