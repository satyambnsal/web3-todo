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
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={props.handleClose}
            role="presentation"
          >
            ✕
          </label>
          {props.children}
        </div>
      </div>
    </div>
  );
};
