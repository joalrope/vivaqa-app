import { startLogout } from "../../actions/auth";
import { store } from "../../store/store";
import { showExpiredSessionMessage } from "./showExpiredSessionMessage";

export const checkStatus = (status) => {
	if (status === 401) {
		const previousUrl = window.location.pathname;
		sessionStorage.clear();
		store.dispatch(startLogout());
		showExpiredSessionMessage(previousUrl);

		return {
			ok: false,
			msg: "unauthorized",
			result: {},
		};
	}
	if (status === 404) {
		return {
			ok: false,
			msg: "Recurso No encontrado",
			result: {},
		};
	}
	if (status === 501) {
		return {
			ok: false,
			msg: "No hay coneccion con la Base de Datos",
			result: {},
		};
	}
};
