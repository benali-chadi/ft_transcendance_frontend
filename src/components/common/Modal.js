import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");

const Modal = ({ children }) => {
	const modalRef = useRef(null);
	if (!modalRef.current) modalRef.current = document.createElement("div");
	useEffect(() => {
		modalRoot.appendChild(modalRef.current);
		return () => modalRoot.removeChild(modalRef.current);
	}, []);
	return createPortal(<div>{children}</div>, modalRef.current);
};

export default Modal;
