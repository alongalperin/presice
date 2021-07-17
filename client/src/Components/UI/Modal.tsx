import React, { Children, FunctionComponent } from 'react';

import './modal.scss';

type ModalProps = {
  visible: boolean;
  children?: React.ReactNode;
  saveButtonText?: string;
  saveButtonHandler?: () => void;
  cancelButtonText?: string;
  cancelButtonHandler?: () => void;
};

const Modal: FunctionComponent<ModalProps> = ({
  visible,
  children,
  saveButtonText,
  saveButtonHandler,
  cancelButtonText,
  cancelButtonHandler,
}: ModalProps) => {
  if (!visible) {
    return <></>;
  }
  return (
    <div className="Modal__Container">
      <div className="Modal__Body">
        {children}
        <div className="Modal__Buttons_Container">
          <button
            className="Button Button__Success"
            onClick={saveButtonHandler}
          >
            {saveButtonText}
          </button>
          <button
            className="Button Button__Danger"
            onClick={cancelButtonHandler}
          >
            {cancelButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
