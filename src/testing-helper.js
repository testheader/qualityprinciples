import {MemoryRouter} from "react-router-dom";
import App from "./App";

const TestsWithRouter = () => {
    return (
        <MemoryRouter initialEntries={['/']}>
            <App />
        </MemoryRouter>
    )
}

export default TestsWithRouter