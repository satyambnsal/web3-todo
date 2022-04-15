import classNames from 'classnames';
import React from 'react';

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
};

export const Modal = (props: Props) => {
  return (
    <div>
      <div className={classNames('modal', { 'modal-open': props.isOpen })}>
        <div className="modal-box relative">
          <button
            className="h-2 absolute right-4 top-4"
            onClick={props.handleClose}
          >
            <span className="leading-4 block h-8">X</span>
          </button>
          {props.children}
        </div>
      </div>
    </div>
  );
};
