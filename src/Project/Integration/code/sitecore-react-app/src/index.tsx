import ReactDOM from "react-dom/client";
import Greeting from "./components/Greeting";


export const renderReactComponent = (rootElement: HTMLElement, props: any) => {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<Greeting {...props} />);
};

window.ReactApp = { renderReactComponent };