import { useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

const createWrapperAndAppendToBody = (wrapperId: string) => {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
};

type Props = {
  children: JSX.Element;
  portalId: string;
};

const ReactPortal = ({ children, portalId }: Props) => {
  const [wrapperElement, setWrapperElement] = useState<any>(null);

  useLayoutEffect(() => {
    let element = document.getElementById(portalId) as HTMLElement;
    let systemCreated = false;

    // if element is not found with portalId,
    // create and append to body programatically
    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(portalId);
    }

    setWrapperElement(element);

    return () => {
      // delete the programatically created element
      if (systemCreated && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [portalId]);

  // wrapperElement state will be null on the very first render.
  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
};

export default ReactPortal;
