import { Container } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "./components/Form";
import Home from "./components/Home";
import { Title } from "./components/styles";

function App() {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Title>Dashboard</Title>

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/form" element={<Form />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
