import { types } from "../types/types";
import { fetchPublic } from "../helpers/fetch/fetchPublic";
import { fetchPrivate } from "../helpers/fetch/fetchPrivate";
import { Modal } from "antd";
import history from "../helpers/history";

export const startLogin = (email, password) => {
	return async (dispatch) => {
		const { ok, msg, token, uid, name } = await dispatch(
			fetchPublic("/auth", { email, password }, "POST")
		);

		if (ok) {
			dispatch(
				login({
					uid,
					name,
					isLoggedIn: true,
				})
			);
			sessionStorage.token = token;
			sessionStorage.isLogged = true;

			history.push("/quizzes");
		} else {
			Modal.error({
				title: "Autenticacion",
				content: [`${msg}`],
				autoFocusButton: null,
			});
			history.push("/home");
			history.push("/login");
		}
	};
};

export const startRegister = (name, email, password) => {
	return async (dispatch) => {
		const {
			ok,
			msg,
			token,
			uid,
			name: userName,
		} = await dispatch(
			fetchPublic("/auth/new", { name, email, password }, "POST")
		);

		if (ok) {
			sessionStorage.token = token;
			sessionStorage.token_init_date = new Date().getTime();

			dispatch(
				login({
					uid,
					userName,
				})
			);
		} else {
			Modal.error({
				title: "Autenticacion",
				content: [`${msg}`],
				autoFocusButton: null,
			});
		}
	};
};

//export const startPassRecovery = (email) => {};

export const startChecking = () => {
	return async (dispatch) => {
		if ("token" in sessionStorage) {
			const { ok, token, uid, name } = await dispatch(
				fetchPrivate("/auth/renew")
			);

			if (ok) {
				sessionStorage.token = token;
				sessionStorage.token_init_date = new Date().getTime();

				const isLoggedIn = uid ? true : false;

				// (uid) ? isLoggedIn = true : isLoggedIn = false

				dispatch(
					login({
						uid,
						name,
						isLoggedIn,
					})
				);
			} else {
				//dispatch(loadingFinish());
			}
		}
	};
};

export const startLogout = () => {
	return (dispatch) => {
		dispatch(logout());
	};
};

export const startShowRegister = () => {
	return (dispatch) => {
		dispatch(showRegisterForm(true));
	};
};

export const startHideLogin = () => {};

export const startHideRegister = () => {
	return (dispatch) => {
		dispatch(showRegisterForm(false));
	};
};

const login = (user) => ({
	type: types.authlogin,
	payload: user,
});

const logout = () => ({
	type: types.authlogout,
});

const showRegisterForm = (valVisible) => ({
	type: types.authShowRegister,
	payload: valVisible,
});
