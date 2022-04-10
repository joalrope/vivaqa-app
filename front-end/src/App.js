import { Provider } from "react-redux";
import { AppLayout } from "./layouts/AppLayout";
import { store } from "./store/store";
import "antd/dist/antd.css";

function App() {
	return (
		<Provider store={store}>
			<AppLayout />
		</Provider>
	);
}

export default App;
