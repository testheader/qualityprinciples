import {MemoryRouter} from "react-router-dom";
import App from "./App";

const TestsWithRouterRoot = () => {
    return (
        <MemoryRouter initialEntries={['/']}>
            <App />
        </MemoryRouter>
    )
}

const TestsWithRouterOverview = () => {
    return (
        <MemoryRouter initialEntries={['/overview']}>
            <App />
        </MemoryRouter>
    )
}

export {TestsWithRouterRoot, TestsWithRouterOverview}