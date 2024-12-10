import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import SimpleEventManager from './SimpleEventManager';

export const ScrollProviderContext = React.createContext({});

class ScrollProvider extends React.PureComponent {
  constructor(props) {
    super(props);

    this.contextValue = {
      addResizeEventListener: this.addResizeEventListener,
      addScrollEventListener: this.addScrollEventListener,
      removeResizeEventListener: this.removeResizeEventListener,
      removeScrollEventListener: this.removeScrollEventListener,
    };

    this.scrollListeners = new SimpleEventManager();
    this.resizeListeners = new SimpleEventManager();

    this.scrollTop = 0;
    this.scrollDelta = 0;
    this.viewportHeight = 0;
    this.viewportWidth = 0;
  }

  componentDidMount() {
    this.requestScrollFrame();
    this.setViewportSize();
    this.debounceResize = debounce(this.handleResize, 200);
    window.addEventListener('resize', this.debounceResize);
    window.addEventListener('orientationchange', this.debounceResize);

    this.fireResizeEvent();
    this.fireScrollEvent();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.debounceResize);
    window.removeEventListener('orientationchange', this.debounceResize);

    this.scrollListeners.removeAllEventListeners();
    this.resizeListeners.removeAllEventListeners();
  }

  setViewportSize = () => {
    this.viewportHeight = window.document.documentElement.clientHeight;
    this.viewportWidth = window.document.documentElement.clientWidth;
  };

  handleResize = () => {
    this.setViewportSize();
    this.fireResizeEvent();
  };

  static getScrollTop() {
    if (window.pageYOffset) return window.pageYOffset;
    return document.documentElement.clientHeight
      ? document.documentElement.scrollTop
      : document.body.scrollTop;
  }

  requestScrollFrame = () => {
    this.animationFrame = window.requestAnimationFrame(this.requestScrollFrame);

    const scrollTop = ScrollProvider.getScrollTop();
    const scrollDelta = scrollTop - this.scrollTop;

    if (scrollTop !== this.scrollTop || scrollDelta !== this.scrollDelta) {
      this.scrollDelta = scrollDelta;
      this.scrollTop = scrollTop;
      this.fireScrollEvent();
    }
  };

  addScrollEventListener = (listener) => {
    this.scrollListeners.addEventListener(listener);
    this.fireScrollEvent();
  };

  addResizeEventListener = (listener) => {
    this.resizeListeners.addEventListener(listener);
    this.fireResizeEvent();
  };

  removeScrollEventListener = (listener) => {
    this.scrollListeners.removeEventListener(listener);
  };

  removeResizeEventListener = (listener) => {
    this.resizeListeners.removeEventListener(listener);
  };

  fireScrollEvent(listener) {
    const event = {
      scrollTop: this.scrollTop,
      scrollDelta: this.scrollDelta,
      viewportHeight: this.viewportHeight,
      viewportWidth: this.viewportWidth,
    };
    if (listener) {
      listener(event);
    } else {
      this.scrollListeners.fire(event);
    }
  }

  fireResizeEvent(listener) {
    const event = {
      scrollTop: ScrollProvider.getScrollTop(),
      scrollDelta: this.scrollDelta,
      viewportHeight: this.viewportHeight,
      viewportWidth: this.viewportWidth,
    };
    if (listener) {
      listener(event);
    } else {
      this.resizeListeners.fire(event);
    }
  }

  render() {
    return (
      <ScrollProviderContext.Provider value={this.contextValue}>
        {this.props.children}
      </ScrollProviderContext.Provider>
    );
  }
}

ScrollProvider.defaultProps = {
  children: null,
};

ScrollProvider.propTypes = {
  children: PropTypes.node,
};

export default ScrollProvider;
