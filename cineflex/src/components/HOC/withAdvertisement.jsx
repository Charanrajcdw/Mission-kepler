const withAdvertisement = (WrappedComponent) => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

  return hocComponent;
};

export default withAdvertisement;
