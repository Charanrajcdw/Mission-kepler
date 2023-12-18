import { useState } from "react";

const withAdvertisement = (WrappedComponent) => {
  const EnhancedComponent = (props) => {
    const [state, setState] = useState({
      timer: 0,
      message: "",
      showAd: false,
      showNotification: false,
      isAdPlayed: false,
    });

    const displayHandler = (time, message, isAd) => {
      if (isAd) setState({ ...state, isAdPlayed: true });
      setState({
        ...state,
        timer: time,
        message: message,
        showAd: isAd,
        showNotification: true,
      });
    };

    const stopAd = () => {
      setState({
        ...state,
        timer: 0,
        message: "",
        showAd: false,
        showNotification: false,
      });
    };

    return <WrappedComponent {...props} {...state} displayHandler={displayHandler} stopAd={stopAd} />;
  };

  return EnhancedComponent;
};

export default withAdvertisement;
